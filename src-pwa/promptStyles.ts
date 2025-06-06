/**
 * Module for handling different prompt style formats.
 * 
 * This module provides interfaces and implementations for converting prompt elements
 * into different output formats such as XML, Markdown, YAML, and JSON.
 */

/**
 * Interface for converting prompt elements into a specific format.
 */
export interface PromptStyle {
  /**
   * Converts a map of prompt elements into a formatted string.
   * 
   * @param inputMap - A Map where keys are the names of the prompt elements (e.g., "Role", "Task")
   *                  and values are the corresponding input strings.
   * @param order - Optional array specifying the order in which elements should appear in the output.
   *               If undefined, the implementation should use a default order or sort the elements.
   * @returns A string containing the formatted prompt.
   */
  format(inputMap: Record<string, string>, order?: string[]): string;
}

/**
 * Implementation of the XML prompt style.
 */
export class XmlPromptStyle implements PromptStyle {
  format(inputMap: Record<string, string>, order?: string[]): string {
    let output = "";
    
    const elementOrder = order || ["Role", "Task", "Context", "Constraints"];
    
    for (const key of elementOrder) {
      const value = inputMap[key];
      if (value && value.trim() !== "") {
        output += `<${key}>${value.trim()}</${key}>\n`;
      }
    }
    
    // Remove the last newline if it exists
    if (output.endsWith('\n')) {
      output = output.slice(0, -1);
    }
    
    return output;
  }
}

/**
 * Implementation of the Markdown prompt style.
 */
export class MarkdownPromptStyle implements PromptStyle {
  format(inputMap: Record<string, string>, order?: string[]): string {
    let output = "";
    
    const elementOrder = order || ["Role", "Task", "Context", "Constraints"];
    
    for (const key of elementOrder) {
      const value = inputMap[key];
      if (value && value.trim() !== "") {
        output += `# ${key}\n\n${value.trim()}\n\n`;
      }
    }
    
    // Remove the last newline if it exists
    if (output.endsWith('\n')) {
      output = output.slice(0, -1);
    }
    
    return output;
  }
}

/**
 * Implementation of the YAML prompt style.
 */
export class YamlPromptStyle implements PromptStyle {
  format(inputMap: Record<string, string>, order?: string[]): string {
    let output = "";
    
    const elementOrder = order || ["Role", "Task", "Context", "Constraints"];
    
    for (const key of elementOrder) {
      const value = inputMap[key];
      if (value && value.trim() !== "") {
        // Format key in lowercase for YAML convention
        const yamlKey = key.toLowerCase();
        
        // For multi-line values, use the YAML block scalar style with indentation
        if (value.includes('\n')) {
          output += `${yamlKey}: |\n`;
          // Indent each line with two spaces
          for (const line of value.trim().split('\n')) {
            output += `  ${line}\n`;
          }
        } else {
          // For single-line values, use simple key-value format
          output += `${yamlKey}: ${value.trim()}\n`;
        }
      }
    }
    
    // Remove the last newline if it exists
    if (output.endsWith('\n')) {
      output = output.slice(0, -1);
    }
    
    return output;
  }
}

/**
 * Implementation of the JSON prompt style.
 * This is an additional style not present in the original Rust code.
 */
export class JsonPromptStyle implements PromptStyle {
  format(inputMap: Record<string, string>, order?: string[]): string {
    const result: Record<string, string> = {};
    
    const elementOrder = order || ["Role", "Task", "Context", "Constraints"];
    
    for (const key of elementOrder) {
      const value = inputMap[key];
      if (value && value.trim() !== "") {
        // Use camelCase for JSON keys as per JavaScript convention
        const jsonKey = key.charAt(0).toLowerCase() + key.slice(1);
        result[jsonKey] = value.trim();
      }
    }
    
    return JSON.stringify(result, null, 2);
  }
}

/**
 * Factory function to create a prompt style based on the format name.
 * @param format - The name of the format ("xml", "markdown", "yaml", "json")
 * @returns A PromptStyle implementation for the specified format
 */
export function createPromptStyle(format: string): PromptStyle {
  switch (format.toLowerCase()) {
    case 'xml':
      return new XmlPromptStyle();
    case 'markdown':
    case 'md':
      return new MarkdownPromptStyle();
    case 'yaml':
    case 'yml':
      return new YamlPromptStyle();
    case 'json':
      return new JsonPromptStyle();
    default:
      throw new Error(`Unsupported prompt format: ${format}`);
  }
}