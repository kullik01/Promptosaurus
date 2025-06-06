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
      const promptStyle = createPromptStyle(format);
      return promptStyle.format(data, order);
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
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
      throw error;
    }
  }
}