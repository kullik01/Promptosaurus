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
   * Saves data using Tauri's invoke to call the Rust backend
   * @param data The string data to save
   * @returns A promise that resolves when the data is saved
   */
  async saveData(data: string): Promise<void> {
    try {
      await core.invoke('save_data', { content: data });
    } catch (error) {
      console.error('Error saving data via Tauri:', error);
      throw error;
    }
  }

  /**
   * Loads data using Tauri's invoke to call the Rust backend
   * @returns A promise that resolves with the loaded data as a string
   */
  async loadData(): Promise<string> {
    try {
      return await core.invoke<string>('load_data');
    } catch (error) {
      console.error('Error loading data via Tauri:', error);
      throw error;
    }
  }

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
}