/**
 * TypeScript implementation of the Promptosaurus API.
 * This provides a PWA-compatible version of the functionality
 * that mirrors the Rust backend implementation.
 */

import { XmlPromptStyle, MarkdownPromptStyle, YamlPromptStyle, JsonPromptStyle, PromptStyle } from './prompt_styles';

/**
 * Represents the available prompt style formats.
 */
export enum PromptFormat {
  Xml = 'Xml',
  Markdown = 'Markdown',
  Yaml = 'Yaml',
  Json = 'Json',
}

/**
 * Processes the input from the UI textboxes and transforms it into a single output string
 * with the specified format.
 *
 * @param inputMap - A Record where keys are the names of the textboxes (e.g., "Role", "Task")
 *                 and values are the corresponding input strings.
 * @param format - Optional parameter specifying the output format. Defaults to XML if not provided.
 * @returns A Promise containing the formatted prompt string.
 */
export async function processInput(
  inputMap: Record<string, string>,
  format?: PromptFormat
): Promise<string> {
  // Default to XML format if not specified
  const selectedFormat = format || PromptFormat.Xml;
  
  // Select the appropriate prompt style based on the format
  let promptStyle: PromptStyle;
  
  switch (selectedFormat) {
    case PromptFormat.Xml:
      promptStyle = new XmlPromptStyle();
      break;
    case PromptFormat.Markdown:
      promptStyle = new MarkdownPromptStyle();
      break;
    case PromptFormat.Yaml:
      promptStyle = new YamlPromptStyle();
      break;
    case PromptFormat.Json:
      promptStyle = new JsonPromptStyle();
      break;
    default:
      // TypeScript should catch this at compile time, but just in case
      promptStyle = new XmlPromptStyle();
  }
  
  // Define the order of elements in the output
  const order = ["Role", "Task", "Context", "Constraints"];
  
  // Format the input using the selected prompt style
  const output = promptStyle.format(inputMap, order);
  
  return output;
}