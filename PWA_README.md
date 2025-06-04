# Promptosaurus Progressive Web App

## Overview

Promptosaurus now supports two backend implementations:

1. **Rust Backend (Tauri)**: The original implementation that runs as a desktop application.
2. **TypeScript Backend (PWA)**: A new implementation that runs as a Progressive Web App in the browser.

This dual-backend approach allows Promptosaurus to be used both as a desktop application and as a web application, with the same functionality and user experience.

## Features

- **Identical Functionality**: Both backends implement the same prompt formatting logic.
- **Automatic Detection**: The application automatically detects whether it's running as a desktop app or a PWA.
- **Offline Support**: The PWA version works offline once it's been loaded.
- **Installable**: The PWA can be installed on desktop and mobile devices.

## Supported Prompt Formats

Both backends support the following prompt formats:

- **XML**: Formats prompts as XML elements.
- **Markdown**: Formats prompts as Markdown headings and text.
- **YAML**: Formats prompts as YAML with proper indentation for multi-line values.
- **JSON**: Formats prompts as JSON with special handling for multi-line constraints.

## Implementation Details

### TypeScript Implementation

The TypeScript implementation mirrors the Rust implementation, with the following components:

- `prompt_styles.ts`: Defines the `PromptStyle` interface and implements the different prompt style classes.
- `api.ts`: Provides the `processInput` function that mirrors the Rust `process_input` function.

### PWA Features

- **Service Worker**: Enables offline functionality by caching assets and API responses.
- **Manifest**: Defines the PWA metadata for installation.
- **Responsive Design**: Works on desktop and mobile devices.

## Development

### Running the Application

- **Desktop App**: Run `npm run tauri dev` to start the Tauri desktop application.
- **PWA**: Run `npm run dev` to start the Vite development server for the PWA.

### Building the Application

- **Desktop App**: Run `npm run tauri build` to build the Tauri desktop application.
- **PWA**: Run `npm run build` to build the PWA for deployment.

### Testing

Run `npm test` to run the unit tests for both the TypeScript and Rust implementations.

## Architecture

The application uses a dual-backend architecture:

```
+-------------------+
|                   |
|  React Frontend   |
|                   |
+--------+----------+
         |
         v
+--------+----------+
|                   |
| Backend Selection |
|                   |
+--------+----------+
         |
         v
+--------+----------+     +-------------------+
|                   |     |                   |
| Tauri/Rust Backend| <-> | TypeScript Backend|
|                   |     |                   |
+-------------------+     +-------------------+
```

The frontend detects whether it's running in a Tauri environment or a browser environment and uses the appropriate backend implementation.