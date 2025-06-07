/**
 * Tauri Platform Service Implementation
 * 
 * This service implements the PlatformService interface for the Tauri desktop platform.
 * It uses Tauri's IPC to call Rust functions for data persistence operations and
 * prompt formatting.
 */
import { core } from '@tauri-apps/api';
import { writeText } from '@tauri-apps/plugin-clipboard-manager';
import { PlatformService } from './platformService';

export class TauriPlatformService implements PlatformService {
  /**
   * Formats prompt data into a specific format using the Rust backend
   * @param data The prompt data to format
   * @param format The format to convert to ('xml', 'markdown', 'yaml', 'json')
   * @param order Optional array specifying the order of elements in the output
   * @returns A promise that resolves with the formatted prompt string
   */
  async formatPrompt(data: Record<string, string>, format: string, order?: string[]): Promise<string> {
    try {
      // For now, we'll use the process_input function for XML format
      // In the future, this will be updated to use format-specific Rust functions
      if (format.toLowerCase() === 'xml') {
        return await core.invoke<string>('process_input', { input_map: data });
      }
      
      // Temporary fallback: import the PWA implementation for other formats
      // This should be replaced with proper Rust implementations later
      const srcPwa = await import('../../src-pwa');
      const promptStyle = srcPwa.createPromptStyle(format);
      return promptStyle.format(data, order);
    } catch (error) {
      console.error(`Error formatting prompt as ${format}:`, error);
      throw error;
    }
  }

  /**
   * Copies text to the clipboard using Tauri's clipboard API
   * @param text The text to copy to the clipboard
   * @returns A promise that resolves when the text is copied
   */
  async copyToClipboard(text: string): Promise<void> {
    try {
      await writeText(text);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      throw error;
    }
  }

  /**
   * Saves a prompt to local storage using Tauri's filesystem API
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
    // @ts-expect-error is declared but its value is never read (due to being a stub for now)
    name: string, 
    // @ts-expect-error is declared but its value is never read (due to being a stub for now)
    elements: PromptElement[],
    // @ts-expect-error is declared but its value is never read (due to being a stub for now)
    description?: string, 
    // @ts-expect-error is declared but its value is never read (due to being a stub for now)
    categoryId?: string, 
    // @ts-expect-error is declared but its value is never read (due to being a stub for now)
    tags?: string[]
  ): Promise<string> {
    try {
      // TODO: Implement using Tauri's filesystem API to save prompts to a JSON file
      console.warn('savePrompt not fully implemented yet');
      
      // Generate a temporary ID for now
      const tempId = promptId || `temp-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      console.info(`Generated temporary ID for prompt: ${tempId}`);
      
      return tempId;
    } catch (error) {
      console.error('Error saving prompt:', error);
      throw new Error(`Failed to save prompt: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Gets a prompt by its ID from storage
   * @param promptId The ID of the prompt to get
   * @returns A promise that resolves with the prompt
   */
  async getPromptById(promptId: string): Promise<any> {
    try {
      // TODO: Implement using Tauri's filesystem API to read prompts from a JSON file
      console.error(`Prompt with ID ${promptId} not found - getPromptById not fully implemented yet`);
      throw new Error(`Prompt with ID ${promptId} not found`);
    } catch (error) {
      console.error(`Error getting prompt with ID ${promptId}:`, error);
      throw error; // We need to throw here as the caller expects a specific prompt
    }
  }

  /**
   * Gets all prompts from storage, optionally filtered by category
   * @param categoryId Optional category ID to filter by
   * @returns A promise that resolves with an array of prompts
   */
  // @ts-expect-error is declared but its value is never read (due to being a stub for now)
  async getAllPrompts(categoryId?: string): Promise<any[]> {
    try {
      // TODO: Implement using Tauri's filesystem API to read prompts from a JSON file
      // For now, return an empty array instead of throwing an error
      // This ensures the application can still function without saved prompts
      console.warn('getAllPrompts not fully implemented yet, returning empty array');
      return [];
    } catch (error) {
      console.error('Error getting all prompts:', error);
      // Return empty array instead of throwing to ensure the app can still function
      return [];
    }
  }

  /**
   * Deletes a prompt from storage
   * @param promptId The ID of the prompt to delete
   * @returns A promise that resolves when the prompt is deleted
   */
  async deletePrompt(promptId: string): Promise<void> {
    try {
      // TODO: Implement using Tauri's filesystem API to update a JSON file
      console.warn(`deletePrompt not fully implemented yet for prompt ID: ${promptId}`);
      // Return successfully even though we didn't actually delete anything
      return;
    } catch (error) {
      console.error(`Error deleting prompt with ID ${promptId}:`, error);
      throw new Error(`Failed to delete prompt: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  /**
   * Searches for prompts by name
   * @param searchTerm The search term to look for in prompt names
   * @returns A promise that resolves with an array of matching prompts
   */
  async searchPrompts(searchTerm: string): Promise<any[]> {
    try {
      // TODO: Implement using Tauri's filesystem API to read and filter prompts from a JSON file
      console.warn(`searchPrompts not fully implemented yet for term: ${searchTerm}`);
      // Return empty array to ensure the app can still function
      return [];
    } catch (error) {
      console.error(`Error searching prompts with term "${searchTerm}":`, error);
      // Return empty array instead of throwing to ensure the app can still function
      return [];
    }
  }
}