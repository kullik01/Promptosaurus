//! Module for handling different prompt style formats.
//!
//! This module provides traits and implementations for converting prompt elements
//! into different output formats such as XML, Markdown, YAML, and JSON.

use std::collections::HashMap;

/// Trait for converting prompt elements into a specific format.
pub trait PromptStyle {
    /// Converts a map of prompt elements into a formatted string.
    ///
    /// # Arguments
    ///
    /// * `input_map` - A HashMap where keys are the names of the prompt elements (e.g., "Role", "Task")
    ///                and values are the corresponding input strings.
    /// * `order` - Optional vector specifying the order in which elements should appear in the output.
    ///            If None, the implementation should use a default order or sort the elements.
    ///
    /// # Returns
    ///
    /// A String containing the formatted prompt.
    fn format(&self, input_map: &HashMap<String, String>, order: Option<Vec<&str>>) -> String;
}

/// Implementation of the XML prompt style.
pub struct XmlPromptStyle;

impl PromptStyle for XmlPromptStyle {
    fn format(&self, input_map: &HashMap<String, String>, order: Option<Vec<&str>>) -> String {
        let mut output = String::new();
        
        let element_order = order.unwrap_or_else(|| vec!["Role", "Task", "Context", "Constraints"]);
        
        for key in element_order {
            if let Some(value) = input_map.get(key) {
                if !value.trim().is_empty() {
                    output.push_str(&format!("<{}>{}</{}>{}", key, value.trim(), key, "\n"));
                }
            }
        }
        
        // Remove the last newline if it exists
        if output.ends_with('\n') {
            output.pop();
        }
        
        output
    }
}

/// Implementation of the Markdown prompt style.
pub struct MarkdownPromptStyle;

impl PromptStyle for MarkdownPromptStyle {
    fn format(&self, input_map: &HashMap<String, String>, order: Option<Vec<&str>>) -> String {
        let mut output = String::new();
        
        let element_order = order.unwrap_or_else(|| vec!["Role", "Task", "Context", "Constraints"]);
        
        for key in element_order {
            if let Some(value) = input_map.get(key) {
                if !value.trim().is_empty() {
                    output.push_str(&format!("# {}{}{}{}{}\n", key, "\n\n", value.trim(), "\n", "\n"));
                }
            }
        }
        
        // Remove the last newline if it exists
        if output.ends_with('\n') {
            output.pop();
        }
        
        output
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    
    #[test]
    fn test_xml_prompt_style() {
        let style = XmlPromptStyle;
        let mut input_map = HashMap::new();
        
        input_map.insert("Role".to_string(), "Educational content writer".to_string());
        input_map.insert("Task".to_string(), "Explain photosynthesis".to_string());
        
        let result = style.format(&input_map, None);
        
        assert!(result.contains("<Role>Educational content writer</Role>"));
        assert!(result.contains("<Task>Explain photosynthesis</Task>"));
        
        // Test with empty values
        input_map.insert("Context".to_string(), "".to_string());
        let result = style.format(&input_map, None);
        assert!(!result.contains("<Context>"));
        
        // Test with custom order
        let custom_order = vec!["Task", "Role"];
        let result = style.format(&input_map, Some(custom_order));
        
        // The Task should come before Role in the output
        assert!(result.find("<Task>").unwrap() < result.find("<Role>").unwrap());
    }
    
    #[test]
    fn test_markdown_prompt_style() {
        let style = MarkdownPromptStyle;
        let mut input_map = HashMap::new();
        
        input_map.insert("Role".to_string(), "Educational content writer".to_string());
        input_map.insert("Task".to_string(), "Explain photosynthesis".to_string());
        
        let result = style.format(&input_map, None);
        
        assert!(result.contains("# Role"));
        assert!(result.contains("Educational content writer"));
        assert!(result.contains("# Task"));
        assert!(result.contains("Explain photosynthesis"));
        
        // Test with empty values
        input_map.insert("Context".to_string(), "".to_string());
        let result = style.format(&input_map, None);
        assert!(!result.contains("# Context"));
        
        // Test with custom order
        let custom_order = vec!["Task", "Role"];
        let result = style.format(&input_map, Some(custom_order));
        
        // The Task should come before Role in the output
        assert!(result.find("# Task").unwrap() < result.find("# Role").unwrap());
    }
}