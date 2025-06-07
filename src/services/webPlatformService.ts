/**
 * Web Platform Service Implementation
 * 
 * This service implements the PlatformService interface for the web/PWA platform.
 * It uses browser APIs (IndexedDB) for data persistence operations and
 * implements prompt formatting using the PWA module.
 */
import { PlatformService } from './platformService';
import { createPromptStyle, createPrompt, PromptElement, Prompt } from '../../src-pwa';

// Database configuration
const DB_NAME = 'promptosaurus-db';
const DB_VERSION = 1;
const PROMPTS_STORE = 'prompts';

/**
 * Opens the IndexedDB database for prompt storage
 * @returns A promise that resolves with the database instance
 */
const openDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error('IndexedDB is not supported in this browser'));
      return;
    }

    const request = window.indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = (event) => {
      reject(new Error(`Database error: ${(event.target as IDBRequest).error}`));
    };

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result);
    };

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      
      // Create object store for prompts if it doesn't exist
      if (!db.objectStoreNames.contains(PROMPTS_STORE)) {
        const store = db.createObjectStore(PROMPTS_STORE, { keyPath: 'id' });
        
        // Create indexes for searching
        store.createIndex('name', 'name', { unique: false });
        store.createIndex('categoryId', 'categoryId', { unique: false });
        store.createIndex('updatedAt', 'updatedAt', { unique: false });
      }
    };
  });
};

export class WebPlatformService implements PlatformService {
  /**
   * Formats prompt data into a specific format using the PWA module's prompt styles
   * @param data The prompt data to format
   * @param format The format to convert to ('xml', 'markdown', 'yaml', 'json')
   * @param order Optional array specifying the order of elements in the output
   * @returns A promise that resolves with the formatted prompt string
   */
  async formatPrompt(data: Record<string, string>, format: string, order?: string[]): Promise<string> {
    try {
      // Transform the keys from lowercase to capitalized
      const transformedData: Record<string, string> = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          // Capitalize the first letter of the key
          const capitalizedKey = key.charAt(0).toUpperCase() + key.slice(1);
          transformedData[capitalizedKey] = data[key];
        }
      }
      
      const promptStyle = createPromptStyle(format);
      return promptStyle.format(transformedData, order);
    } catch (error) {
      console.error(`Error formatting prompt as ${format}:`, error);
      throw error;
    }
  }

  /**
   * Copies text to the clipboard using the browser's Clipboard API
   * @param text The text to copy to the clipboard
   * @returns A promise that resolves when the text is copied
   */
  async copyToClipboard(text: string): Promise<void> {
    try {
      // The Clipboard API requires a secure context (HTTPS) and may require user permission
      // Check if the Clipboard API is available
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available in this browser or context');
      }
      // Use the writeText method to write to the clipboard
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      
      // Fallback method using document.execCommand (deprecated but has better compatibility)
      try {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        
        // Make the textarea out of viewport
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        
        // Focus and select the text
        textArea.focus();
        textArea.select();
        
        // Execute the copy command
        const successful = document.execCommand('copy');
        document.body.removeChild(textArea);
        
        if (!successful) {
          throw new Error('Fallback clipboard copy failed');
        }
      } catch (fallbackError) {
        console.error('Fallback clipboard method failed:', fallbackError);
        throw error; // Throw the original error
      }
    }
  }

  /**
   * Saves a prompt to IndexedDB storage
   * @param promptId The ID of the prompt to save, or undefined to create a new prompt
   * @param name The name of the prompt
   * @param data The prompt data to save
   * @param description Optional description of the prompt
   * @param categoryId Optional category ID for the prompt
   * @param tags Optional tags for the prompt
   * @returns A promise that resolves with the ID of the saved prompt
   */
  async savePrompt(
    promptId: string | undefined, 
    name: string,
    elements: PromptElement[],
    description?: string,
    categoryId?: string,
    tags?: string[]
  ): Promise<string> {
    console.log('WebPlatformService.savePrompt called with:', { name, elements, promptId });
    try {
      let prompt: Prompt;
      
      if (promptId) {
        // Try to get the existing prompt first
        try {
          const existingPrompt = await this.getPromptById(promptId);
          console.log('Found existing prompt:', existingPrompt);
          
          // Update the existing prompt
          prompt = {
            ...existingPrompt,
            name,
            description,
            elements,
            categoryId,
            tags,
            updatedAt: new Date()
          };
        } catch (error) {
          // If the prompt doesn't exist, create a new one with the specified ID
          console.warn(`Prompt with ID ${promptId} not found, creating new prompt`);
          prompt = createPrompt(name, elements, description, categoryId, tags);
        }
      } else {
        // Create a new prompt
        console.log('Creating new prompt');
        prompt = createPrompt(name, elements, description, categoryId, tags);
      }
      
      // Save the prompt to IndexedDB
      const db = await openDatabase();
      console.log('Database opened for saving prompt');
      
      return new Promise<string>((resolve, reject) => {
        const transaction = db.transaction([PROMPTS_STORE], 'readwrite');
        const store = transaction.objectStore(PROMPTS_STORE);
        
        const request = store.put(prompt);
        
        request.onsuccess = () => {
          console.log('Prompt saved successfully with ID:', prompt.id);
          resolve(prompt.id);
        };
        
        request.onerror = (event) => {
          const error = `Error saving prompt: ${(event.target as IDBRequest).error}`;
          console.error(error);
          reject(new Error(error));
        };
        
        transaction.oncomplete = () => {
          db.close();
          console.log('Database transaction completed and closed');
        };
      });
    } catch (error) {
      console.error('Error saving prompt:', error);
      throw error;
    }
  }

  /**
   * Gets a prompt by its ID from IndexedDB
   * @param promptId The ID of the prompt to get
   * @returns A promise that resolves with the prompt
   */
  async getPromptById(promptId: string): Promise<Prompt> {
    console.log('WebPlatformService.getPromptById called with ID:', promptId);
    const db = await openDatabase();
    console.log('Database opened for getting prompt by ID');
    
    return new Promise<Prompt>((resolve, reject) => {
      const transaction = db.transaction([PROMPTS_STORE], 'readonly');
      const store = transaction.objectStore(PROMPTS_STORE);
      
      const request = store.get(promptId);
      
      request.onsuccess = (event) => {
        const prompt = (event.target as IDBRequest).result as Prompt;
        
        if (prompt) {
          console.log('Found prompt by ID:', prompt);
          resolve(prompt);
        } else {
          const error = `Prompt with ID ${promptId} not found`;
          console.error(error);
          reject(new Error(error));
        }
      };
      
      request.onerror = (event) => {
        const error = `Error getting prompt: ${(event.target as IDBRequest).error}`;
        console.error(error);
        reject(new Error(error));
      };
      
      transaction.oncomplete = () => {
        db.close();
        console.log('Database transaction completed and closed');
      };
    });
  }

  /**
   * Gets all prompts from IndexedDB, optionally filtered by category
   * @param categoryId Optional category ID to filter by
   * @returns A promise that resolves with an array of prompts
   */
  async getAllPrompts(categoryId?: string): Promise<Prompt[]> {
    console.log('WebPlatformService.getAllPrompts called with categoryId:', categoryId);
    const db = await openDatabase();
    console.log('Database opened for getting all prompts');
    
    return new Promise<Prompt[]>((resolve, reject) => {
      const transaction = db.transaction([PROMPTS_STORE], 'readonly');
      const store = transaction.objectStore(PROMPTS_STORE);
      
      let request: IDBRequest;
      
      if (categoryId) {
        // Use the categoryId index to filter prompts
        console.log('Using categoryId index to filter prompts');
        const index = store.index('categoryId');
        request = index.getAll(categoryId);
      } else {
        // Get all prompts
        console.log('Getting all prompts');
        request = store.getAll();
      }
      
      request.onsuccess = (event) => {
        const prompts = (event.target as IDBRequest).result as Prompt[];
        console.log(`Found ${prompts.length} prompts:`, prompts);
        resolve(prompts);
      };
      
      request.onerror = (event) => {
        const error = `Error getting prompts: ${(event.target as IDBRequest).error}`;
        console.error(error);
        reject(new Error(error));
      };
      
      transaction.oncomplete = () => {
        db.close();
        console.log('Database transaction completed and closed');
      };
    });
  }

  /**
   * Deletes a prompt from IndexedDB
   * @param promptId The ID of the prompt to delete
   * @returns A promise that resolves when the prompt is deleted
   */
  async deletePrompt(promptId: string): Promise<void> {
    const db = await openDatabase();
    
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction([PROMPTS_STORE], 'readwrite');
      const store = transaction.objectStore(PROMPTS_STORE);
      
      const request = store.delete(promptId);
      
      request.onsuccess = () => {
        resolve();
      };
      
      request.onerror = (event) => {
        reject(new Error(`Error deleting prompt: ${(event.target as IDBRequest).error}`));
      };
      
      transaction.oncomplete = () => {
        db.close();
      };
    });
  }

  /**
   * Searches for prompts by name
   * @param searchTerm The search term to look for in prompt names
   * @returns A promise that resolves with an array of matching prompts
   */
  async searchPrompts(searchTerm: string): Promise<Prompt[]> {
    // Get all prompts and filter them in memory
    // This is a simple implementation; for large datasets, a more sophisticated
    // approach using IndexedDB's IDBKeyRange might be better
    const allPrompts = await this.getAllPrompts();
    
    // Convert search term to lowercase for case-insensitive comparison
    const lowerSearchTerm = searchTerm.toLowerCase();
    
    // Filter prompts whose names contain the search term
    return allPrompts.filter(prompt => 
      prompt.name.toLowerCase().includes(lowerSearchTerm)
    );
  }
}
