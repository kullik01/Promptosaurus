// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Import modules
mod prompt_styles;

use std::collections::HashMap;
use prompt_styles::{PromptStyle, XmlPromptStyle, MarkdownPromptStyle, YamlPromptStyle};
use serde::{Deserialize, Serialize};

/// Represents the available prompt style formats.
#[derive(Debug, Deserialize, Serialize, Clone, Copy)]
pub enum PromptFormat {
    Xml,
    Markdown,
    Yaml,
    // Future formats can be added here
    // Json,
}

impl Default for PromptFormat {
    fn default() -> Self {
        PromptFormat::Xml
    }
}

/// Processes the input from the UI textboxes and transforms it into a single output string
/// with the specified format. The output is automatically added to the clipboard.
///
/// # Arguments
///
/// * `input_map` - A HashMap where keys are the names of the textboxes (e.g., "Role", "Task")
///                 and values are the corresponding input strings.
/// * `format` - Optional parameter specifying the output format. Defaults to XML if not provided.
///
/// # Returns
///
/// A `Result` containing the formatted prompt string on success, or an error message on failure.
#[tauri::command]
fn process_input(
    input_map: HashMap<String, String>, 
    format: Option<PromptFormat>
) -> Result<String, String> {
    let format = format.unwrap_or_default();
    
    let prompt_style: Box<dyn PromptStyle> = match format {
        PromptFormat::Xml => Box::new(XmlPromptStyle),
        PromptFormat::Markdown => Box::new(MarkdownPromptStyle),
        PromptFormat::Yaml => Box::new(YamlPromptStyle),
        // Add other formats as they are implemented
    };
    
    let order = vec!["Role", "Task", "Context", "Constraints"];
    let output = prompt_style.format(&input_map, Some(order));
    
    Ok(output)
}

fn main() {
    tauri::Builder::default()
        // Register commands from the lib module
        .invoke_handler(tauri::generate_handler![process_input])
        .setup(|_app| {
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("Error while running Promptosaurus application");
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_process_input_xml() {
        let mut input_map = HashMap::new();
        input_map.insert("Role".to_string(), "Test Role".to_string());
        input_map.insert("Task".to_string(), "Test Task".to_string());
        
        let result = process_input(input_map, Some(PromptFormat::Xml)).unwrap();
        
        assert!(result.contains("<Role>Test Role</Role>"));
        assert!(result.contains("<Task>Test Task</Task>"));
    }
    
    #[test]
    fn test_process_input_markdown() {
        let mut input_map = HashMap::new();
        input_map.insert("Role".to_string(), "Test Role".to_string());
        input_map.insert("Task".to_string(), "Test Task".to_string());
        
        let result = process_input(input_map, Some(PromptFormat::Markdown)).unwrap();
        
        assert!(result.contains("# Role"));
        assert!(result.contains("Test Role"));
        assert!(result.contains("# Task"));
        assert!(result.contains("Test Task"));
    }
    
    #[test]
    fn test_process_input_yaml() {
        let mut input_map = HashMap::new();
        input_map.insert("Role".to_string(), "Test Role".to_string());
        input_map.insert("Task".to_string(), "Test Task".to_string());
        input_map.insert("Constraints".to_string(), "- First constraint\n- Second constraint".to_string());
        
        let result = process_input(input_map, Some(PromptFormat::Yaml)).unwrap();
        
        assert!(result.contains("role: Test Role"));
        assert!(result.contains("task: Test Task"));
        assert!(result.contains("constraints: |"));
        assert!(result.contains("  - First constraint"));
        assert!(result.contains("  - Second constraint"));
    }
    
    #[test]
    fn test_process_input_default_format() {
        let mut input_map = HashMap::new();
        input_map.insert("Role".to_string(), "Test Role".to_string());
        
        // When no format is specified, it should default to XML
        let result = process_input(input_map, None).unwrap();
        
        assert!(result.contains("<Role>Test Role</Role>"));
    }
}
