# Promptosaurus PWA Module

This directory contains TypeScript implementations of the prompt formatting styles that were originally written in Rust. These implementations allow the web/PWA version of Promptosaurus to have the same prompt formatting capabilities as the desktop (Tauri) version.

## Available Prompt Styles

- **XML**: Formats prompts with XML tags
- **Markdown**: Formats prompts with Markdown headings
- **YAML**: Formats prompts in YAML format
- **JSON**: Formats prompts in JSON format (additional style not in original Rust implementation)

## Usage Example

```typescript
import { createPromptStyle } from '../src-pwa';

// Create a prompt style based on format name
const xmlStyle = createPromptStyle('xml');
const markdownStyle = createPromptStyle('markdown');
const yamlStyle = createPromptStyle('yaml');
const jsonStyle = createPromptStyle('json');

// Input data
const promptData = {
  "Role": "Software Developer",
  "Task": "Implement a new feature",
  "Context": "The application needs to support multiple prompt formats",
  "Constraints": "Must be compatible with both web and desktop versions"
};

// Format the prompt in different styles
const xmlPrompt = xmlStyle.format(promptData);
const markdownPrompt = markdownStyle.format(promptData);
const yamlPrompt = yamlStyle.format(promptData);
const jsonPrompt = jsonStyle.format(promptData);

// Custom order of elements
const customOrder = ["Task", "Role", "Constraints", "Context"];
const customOrderedPrompt = xmlStyle.format(promptData, customOrder);
```

## Implementation Notes

- The TypeScript implementation closely mirrors the original Rust implementation
- Added a JSON formatter as an additional style
- Added a factory function `createPromptStyle()` for easier style creation
- Uses TypeScript interfaces for better type safety