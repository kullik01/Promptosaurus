# Promptosaurus

<div id='header' align='center'>
  <img src='assets/logo/logo.png' width='300'/>
  <p>A professional prompt engineering and management tool built with Tauri and React.</p>
</div>

## Overview

Promptosaurus is a desktop application designed to help users create, manage, and optimize prompts for AI systems. This project uses Tauri for the backend (Rust) and React with TypeScript for the frontend.

## Terminology definitions
Prompt: A Prompt is a set of instructions that are used as input for LLM models.
Prompt element: A Prompt element is a distinct component or section of a Prompt that serves a specific purpose.
Custom Prompt element: A custom Prompt element is a Prompt element that is created by the user.
Prompt output: The output of a Prompt is the result of the LLM model's processing of the Prompt.
Prompt template: A Prompt template includes the Prompt with the possibility to extend it with Prompt elements and Custom Prompt elements. Also, it includes the Prompt output.
Prompt element template: A Prompt element template includes one Prompt element with the possibility to extend it, e.g. with a Custom Prompt element.
## Features
- Convert Prompt elements to different formats (xml, yaml, json, markdown)
- Save Prompts
- Load saved Prompts
- Add custom Prompt elements
- Create Prompt element content templates
- Load Prompt element content templates
- Estimate Prompt token count
- Organize prompts by categories and tags
- Prompt optimization suggestions

## Development Setup

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)
- Rust (latest stable)
- Cargo (comes with Rust)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Development

To run the application in development mode:

```bash
npm run tauri dev
```

This will start both the Tauri backend and the React frontend in development mode.

### Building

To build the application for production:

```bash
npm run tauri build
```

This will create platform-specific installers in the `src-tauri/target/release/bundle` directory.

## Project Structure

- `src/` - React frontend code
- `src-tauri/` - Rust backend code
  - `src/` - Rust source files
  - `Cargo.toml` - Rust dependencies
- `public/` - Static assets

## UI Implementation

The current UI is a placeholder. The actual interface will be implemented based on Figma designs in a future update.

## Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Tauri](https://marketplace.visualstudio.com/items?itemName=tauri-apps.tauri-vscode) + [rust-analyzer](https://marketplace.visualstudio.com/items?itemName=rust-lang.rust-analyzer)

## License
BSD-3 
