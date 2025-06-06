/**
 * Tauri Platform Service Implementation
 * 
 * This service implements the PlatformService interface for the Tauri desktop platform.
 * It uses Tauri's IPC to call Rust functions for data persistence operations.
 */
import { core } from '@tauri-apps/api';
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
}