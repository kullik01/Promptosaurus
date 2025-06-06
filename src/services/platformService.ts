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
  
  /**
   * Formats prompt data into a specific format (XML, Markdown, YAML, JSON)
   * @param data The prompt data to format
   * @param format The format to convert to ('xml', 'markdown', 'yaml', 'json')
   * @param order Optional array specifying the order of elements in the output
   * @returns A promise that resolves with the formatted prompt string
   */
  formatPrompt(data: Record<string, string>, format: string, order?: string[]): Promise<string>;
  
  /**
   * Copies text to the clipboard
   * @param text The text to copy to the clipboard
   * @returns A promise that resolves when the text is copied
   */
  copyToClipboard(text: string): Promise<void>;
}