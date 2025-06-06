// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Import the lib module
use std::collections::HashMap;

/// Processes the input from the UI textboxes and transforms it into a single output string
/// with dedicated HTML/XML tags. The output is automatically added to the clipboard.
///
/// # Arguments
///
/// * `input_map` - A HashMap where keys are the names of the textboxes (e.g., "Role", "Task")
///                 and values are the corresponding input strings.
///
/// # Returns
///
/// A `Result` indicating success or failure. On success, returns `Ok(())`.
/// On failure, returns `Err(String)` with an error message.
#[tauri::command]
fn process_input(input_map: HashMap<String, String>) -> Result<String, String> {
    let mut output = String::new();

    let order = vec!["Role", "Task", "Context", "Constraints"];

    for key in order {
        if let Some(value) = input_map.get(key) {
            if !value.trim().is_empty() {
                output.push_str(&format!("<{}>\n{}\n</{}>\n", key, value.trim(), key));
            }
        }
    }

    // Remove the last newline if it exists
    if output.ends_with('\n') {
        output.pop();
    }

    Ok(output)
}

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_clipboard_manager::init())
        // Register commands from the lib module
        .invoke_handler(tauri::generate_handler![process_input])
        .setup(|_app| Ok(()))
        .plugin(tauri_plugin_opener::init())
        .run(tauri::generate_context!())
        .expect("Error while running Promptosaurus application");
}
