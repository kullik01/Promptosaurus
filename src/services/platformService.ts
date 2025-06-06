/**
 * Platform Service Interface
 * 
 * This interface defines operations that differ between desktop (Tauri) and web (PWA) platforms.
 * It allows for platform-specific implementations while providing a consistent API for the application.
 */
export interface PlatformService {
  /**
   * Saves data to persistent storage
   * @param data The string data to save
   * @returns A promise that resolves when the data is saved
   */
  saveData(data: string): Promise<void>;

  /**
   * Loads data from persistent storage
   * @returns A promise that resolves with the loaded data as a string
   */
  loadData(): Promise<string>;
}