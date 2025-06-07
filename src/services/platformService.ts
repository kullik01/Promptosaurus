import { PromptElement } from '../../src-pwa';

/**
 * Platform Service Interface
 * 
 * This interface defines the contract for platform-specific services.
 * Implementations should be provided for each supported platform (web, desktop).
 */
export interface PlatformService {
  /**
   * Formats prompt data into a specific format
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

  /**
   * Saves a prompt to local storage
   * @param promptId The ID of the prompt to save, or undefined to create a new prompt
   * @param name The name of the prompt
   * @param elements The prompt elements to save
   * @param description Optional description of the prompt
   * @param categoryId Optional category ID for the prompt
   * @param tags Optional tags for the prompt
   * @returns A promise that resolves with the ID of the saved prompt
   */
  savePrompt(
    promptId: string | undefined, 
    name: string, 
    elements: PromptElement[],
    description?: string, 
    categoryId?: string, 
    tags?: string[]
  ): Promise<string>;

  /**
   * Gets a prompt by its ID from storage
   * @param promptId The ID of the prompt to get
   * @returns A promise that resolves with the prompt
   */
  getPromptById(promptId: string): Promise<any>;

  /**
   * Gets all prompts from storage, optionally filtered by category
   * @param categoryId Optional category ID to filter by
   * @returns A promise that resolves with an array of prompts
   */
  getAllPrompts(categoryId?: string): Promise<any[]>;

  /**
   * Deletes a prompt from storage
   * @param promptId The ID of the prompt to delete
   * @returns A promise that resolves when the prompt is deleted
   */
  deletePrompt(promptId: string): Promise<void>;

  /**
   * Searches for prompts by name
   * @param searchTerm The search term to look for in prompt names
   * @returns A promise that resolves with an array of matching prompts
   */
  searchPrompts(searchTerm: string): Promise<any[]>;
}