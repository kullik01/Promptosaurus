/**
 * Tests for the prompt styles implementation.
 */

import { 
  PromptStyle, 
  XmlPromptStyle, 
  MarkdownPromptStyle, 
  YamlPromptStyle, 
  JsonPromptStyle,
  createPromptStyle 
} from './promptStyles';

// Sample input data for testing
const sampleInput = {
  "Role": "AI Assistant",
  "Task": "Help with coding tasks",
  "Context": "User is working on a TypeScript project",
  "Constraints": "Be concise and accurate"
};

// Test XML format
const xmlStyle = new XmlPromptStyle();
const xmlOutput = xmlStyle.format(sampleInput);
console.log('XML Format:');
console.log(xmlOutput);
console.log('\n');

// Expected XML output:
// <Role>AI Assistant</Role>
// <Task>Help with coding tasks</Task>
// <Context>User is working on a TypeScript project</Context>
// <Constraints>Be concise and accurate</Constraints>

// Test Markdown format
const mdStyle = new MarkdownPromptStyle();
const mdOutput = mdStyle.format(sampleInput);
console.log('Markdown Format:');
console.log(mdOutput);
console.log('\n');

// Expected Markdown output:
// # Role
// 
// AI Assistant
// 
// # Task
// 
// Help with coding tasks
// 
// # Context
// 
// User is working on a TypeScript project
// 
// # Constraints
// 
// Be concise and accurate

// Test YAML format
const yamlStyle = new YamlPromptStyle();
const yamlOutput = yamlStyle.format(sampleInput);
console.log('YAML Format:');
console.log(yamlOutput);
console.log('\n');

// Expected YAML output:
// role: AI Assistant
// task: Help with coding tasks
// context: User is working on a TypeScript project
// constraints: Be concise and accurate

// Test JSON format
const jsonStyle = new JsonPromptStyle();
const jsonOutput = jsonStyle.format(sampleInput);
console.log('JSON Format:');
console.log(jsonOutput);
console.log('\n');

// Expected JSON output:
// {
//   "role": "AI Assistant",
//   "task": "Help with coding tasks",
//   "context": "User is working on a TypeScript project",
//   "constraints": "Be concise and accurate"
// }

// Test with custom order
const customOrder = ["Task", "Role", "Constraints"];
const customOrderedOutput = xmlStyle.format(sampleInput, customOrder);
console.log('Custom Order XML Format:');
console.log(customOrderedOutput);
console.log('\n');

// Expected Custom Order output:
// <Task>Help with coding tasks</Task>
// <Role>AI Assistant</Role>
// <Constraints>Be concise and accurate</Constraints>

// Test factory function
console.log('Testing factory function:');
const formats = ['xml', 'markdown', 'yaml', 'json'];
for (const format of formats) {
  const style = createPromptStyle(format);
  console.log(`${format.toUpperCase()} style created:`, style.constructor.name);
}

// Test multi-line input
const multiLineInput = {
  "Role": "AI Assistant",
  "Task": "Help with coding tasks\nProvide examples\nExplain concepts",
  "Context": "User is working on a TypeScript project",
  "Constraints": "Be concise and accurate"
};

console.log('YAML Format with multi-line input:');
console.log(yamlStyle.format(multiLineInput));

// Expected YAML output with multi-line:
// role: AI Assistant
// task: |
//   Help with coding tasks
//   Provide examples
//   Explain concepts
// context: User is working on a TypeScript project
// constraints: Be concise and accurate