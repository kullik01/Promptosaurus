/**
 * Module for handling prompt elements in the PWA version.
 * 
 * This module provides types and utility functions for working with prompt elements,
 * which are the building blocks of prompts used as input for LLM models.
 */

/**
 * Represents a prompt used as input for LLM models.
 * A prompt is a set of instructions that guides the model's response.
 */
export interface Prompt {
  id: string;
  name: string;
  description?: string;
  elements: PromptElement[];
  categoryId?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Represents a distinct component or section of a prompt that serves a specific purpose.
 * Each prompt element has a type, content, and optional properties.
 */
export interface PromptElement {
  id: string;
  type: string;       // The type of element (e.g., 'role', 'task', 'context', 'constraints')
  name: string;       // Display name for the element
  content: string;    // The actual content of the element
  order: number;      // Position in the prompt
  isRequired: boolean; // Whether this element is required in the prompt
  properties?: Record<string, any>; // Additional properties specific to this element type
}

/**
 * Represents a custom prompt element created by the user.
 * Extends the base PromptElement with user-specific properties.
 */
export interface CustomPromptElement extends PromptElement {
  createdBy: string;  // User identifier
  isTemplate?: boolean; // Whether this element can be used as a template
  templateVariables?: string[]; // Variables that can be replaced in the template
}

/**
 * Represents the output of a prompt after processing by an LLM model.
 * Contains the result and metadata about the processing.
 */
export interface PromptOutput {
  promptId: string;   // Reference to the original prompt
  result: string;     // The output text from the LLM
  timestamp: Date;    // When this output was generated
  modelInfo?: string; // Information about the model used
  tokenCount?: number; // Number of tokens used
  metadata?: Record<string, any>; // Additional metadata about the processing
}

/**
 * Converts a Record<string, string> to an array of PromptElements
 * This is useful for converting the current form data format to the new structure
 * @param data Record where keys are element types and values are content
 * @returns Array of PromptElements
 */
export const recordToPromptElements = (data: Record<string, string>): PromptElement[] => {
  return Object.entries(data).map(([key, value], index) => {
    // Capitalize the first letter for the name
    const name = key.charAt(0).toUpperCase() + key.slice(1);
    
    return {
      id: generateId(),
      type: key,       // type is the lowercase key
      name,           // name is the capitalized key
      content: value,  // content is the value
      order: index,    // order based on entry order
      isRequired: false // not required by default
    };
  });
};

/**
 * Converts an array of PromptElements to a Record<string, string>
 * This is useful for backward compatibility with the current format functions
 * @param elements Array of PromptElements
 * @returns Record where keys are element types and values are content
 */
export const promptElementsToRecord = (elements: PromptElement[]): Record<string, string> => {
  const record: Record<string, string> = {};
  
  sortPromptElements(elements).forEach((element) => {
    record[element.type] = element.content;
  });
  
  return record;
};

/**
 * Sorts prompt elements by their order property
 * @param elements Array of prompt elements to sort
 * @returns Sorted array of prompt elements
 */
export const sortPromptElements = (elements: PromptElement[]): PromptElement[] => {
  return [...elements].sort((a, b) => a.order - b.order);
};

/**
 * Generates a unique ID for prompt elements
 * @returns A unique ID string
 */
function generateId(): string {
  // Simple implementation for the PWA version
  return 'id_' + Math.random().toString(36).substring(2, 11);
}

/**
 * Creates a new prompt with default values
 * @param name Name of the prompt
 * @param elements Array of prompt elements
 * @param description Optional description of the prompt
 * @returns A new Prompt object
 */
export const createPrompt = (
  name: string,
  elements: PromptElement[] = [],
  description?: string,
  categoryId?: string,
  tags?: string[] 
): Prompt => {
  const now = new Date();
  return {
    id: generateId(),
    name,
    description,
    elements,
    categoryId,
    tags,
    createdAt: now,
    updatedAt: now,
  };
};

/**
 * Creates a new prompt element with default values
 * @param type The type of element (e.g., 'role', 'task', 'context', 'constraints')
 * @param name Display name for the element
 * @param content The content of the element
 * @param order Position in the prompt
 * @returns A new PromptElement object
 */
export const createPromptElement = (
  type: string,
  name: string,
  content: string = '',
  order: number = 0,
  isRequired: boolean = false
): PromptElement => {
  return {
    id: generateId(),
    type,
    name,
    content,
    order,
    isRequired,
  };
};

/**
 * Creates a new custom prompt element
 * @param type The type of element
 * @param name Display name for the element
 * @param content The content of the element
 * @param createdBy User identifier
 * @param order Position in the prompt
 * @param isTemplate Whether this element can be used as a template
 * @returns A new CustomPromptElement object
 */
export const createCustomPromptElement = (
  type: string,
  name: string,
  content: string,
  createdBy: string,
  order: number = 0,
  isRequired: boolean = false,
  isTemplate: boolean = false,
  templateVariables: string[] = []
): CustomPromptElement => {
  return {
    ...createPromptElement(type, name, content, order, isRequired),
    createdBy,
    isTemplate,
    templateVariables,
  };
};

/**
 * Validates a prompt element
 * @param element The prompt element to validate
 * @returns An object with isValid flag and error messages
 */
export const validatePromptElement = (element: PromptElement): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (!element.id) errors.push('Element ID is required');
  if (!element.type) errors.push('Element type is required');
  if (!element.name) errors.push('Element name is required');
  if (element.isRequired && !element.content) errors.push('Content is required for this element');
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};