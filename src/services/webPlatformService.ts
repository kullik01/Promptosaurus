/**
 * Web Platform Service Implementation
 * 
 * This service implements the PlatformService interface for the web/PWA platform.
 * It uses browser APIs (localStorage) for data persistence operations.
 */
import { PlatformService } from './platformService';

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
}