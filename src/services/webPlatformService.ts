/**
 * Web Platform Service Implementation
 * 
 * This service implements the PlatformService interface for the web/PWA platform.
 * It uses browser APIs (localStorage) for data persistence operations and
 * implements prompt formatting using the PWA module.
 */
import { PlatformService } from './platformService';
import { createPromptStyle } from '../../src-pwa';

export class WebPlatformService implements PlatformService {
  /**
   * Storage key used for saving application data
   */
  private readonly STORAGE_KEY = 'promptosaurus_data';

  /**
   * Saves data using browser's localStorage
   * @param data The string data to save
   * @returns A promise that resolves when the data is saved
   */
  async saveData(data: string): Promise<void> {
    try {
      localStorage.setItem(this.STORAGE_KEY, data);
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
      throw error;
    }
  }

  /**
   * Loads data from browser's localStorage
   * @returns A promise that resolves with the loaded data as a string
   */
  async loadData(): Promise<string> {
    try {
      return localStorage.getItem(this.STORAGE_KEY) || '';
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
      throw error;
    }
  }

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
}
