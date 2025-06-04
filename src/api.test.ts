import { processInput, PromptFormat } from './api';

// Mock the prompt styles to isolate testing of the processInput function
jest.mock('./prompt_styles', () => {
  return {
    XmlPromptStyle: jest.fn().mockImplementation(() => {
      return {
        format: jest.fn().mockReturnValue('<Role>Test Role</Role>\n<Task>Test Task</Task>')
      };
    }),
    MarkdownPromptStyle: jest.fn().mockImplementation(() => {
      return {
        format: jest.fn().mockReturnValue('# Role\n\nTest Role\n\n# Task\n\nTest Task')
      };
    }),
    YamlPromptStyle: jest.fn().mockImplementation(() => {
      return {
        format: jest.fn().mockReturnValue('role: Test Role\ntask: Test Task\nconstraints: |\n  - First constraint\n  - Second constraint')
      };
    }),
    JsonPromptStyle: jest.fn().mockImplementation(() => {
      return {
        format: jest.fn().mockReturnValue('{\n  "role": "Test Role",\n  "task": "Test Task",\n  "constraints": [\n    "First constraint",\n    "Second constraint"\n  ]\n}')
      };
    })
  };
});

describe('processInput', () => {
  const inputMap = {
    'Role': 'Test Role',
    'Task': 'Test Task',
    'Constraints': '- First constraint\n- Second constraint'
  };

  test('processes input with XML format', async () => {
    const result = await processInput(inputMap, PromptFormat.Xml);
    expect(result).toContain('<Role>Test Role</Role>');
    expect(result).toContain('<Task>Test Task</Task>');
  });

  test('processes input with Markdown format', async () => {
    const result = await processInput(inputMap, PromptFormat.Markdown);
    expect(result).toContain('# Role');
    expect(result).toContain('Test Role');
    expect(result).toContain('# Task');
    expect(result).toContain('Test Task');
  });

  test('processes input with YAML format', async () => {
    const result = await processInput(inputMap, PromptFormat.Yaml);
    expect(result).toContain('role: Test Role');
    expect(result).toContain('task: Test Task');
    expect(result).toContain('constraints: |');
    expect(result).toContain('  - First constraint');
    expect(result).toContain('  - Second constraint');
  });

  test('processes input with JSON format', async () => {
    const result = await processInput(inputMap, PromptFormat.Json);
    expect(result).toContain('"role": "Test Role"');
    expect(result).toContain('"task": "Test Task"');
    expect(result).toContain('"constraints": [');
    expect(result).toContain('"First constraint"');
    expect(result).toContain('"Second constraint"');
  });

  test('defaults to XML format when no format is specified', async () => {
    const result = await processInput(inputMap);
    expect(result).toContain('<Role>Test Role</Role>');
    expect(result).toContain('<Task>Test Task</Task>');
  });
});