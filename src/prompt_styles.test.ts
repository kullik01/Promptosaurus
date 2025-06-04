import { XmlPromptStyle, MarkdownPromptStyle, YamlPromptStyle, JsonPromptStyle } from './prompt_styles';

describe('XmlPromptStyle', () => {
  const style = new XmlPromptStyle();
  
  test('formats basic input correctly', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Task': 'Explain photosynthesis'
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('<Role>Educational content writer</Role>');
    expect(result).toContain('<Task>Explain photosynthesis</Task>');
  });
  
  test('ignores empty values', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Context': ''
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('<Role>Educational content writer</Role>');
    expect(result).not.toContain('<Context>');
  });
  
  test('respects custom order', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Task': 'Explain photosynthesis'
    };
    
    const result = style.format(inputMap, ['Task', 'Role']);
    
    // The Task should come before Role in the output
    expect(result.indexOf('<Task>')).toBeLessThan(result.indexOf('<Role>'));
  });
});

describe('MarkdownPromptStyle', () => {
  const style = new MarkdownPromptStyle();
  
  test('formats basic input correctly', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Task': 'Explain photosynthesis'
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('# Role');
    expect(result).toContain('Educational content writer');
    expect(result).toContain('# Task');
    expect(result).toContain('Explain photosynthesis');
  });
  
  test('ignores empty values', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Context': ''
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('# Role');
    expect(result).not.toContain('# Context');
  });
  
  test('respects custom order', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Task': 'Explain photosynthesis'
    };
    
    const result = style.format(inputMap, ['Task', 'Role']);
    
    // The Task should come before Role in the output
    expect(result.indexOf('# Task')).toBeLessThan(result.indexOf('# Role'));
  });
});

describe('YamlPromptStyle', () => {
  const style = new YamlPromptStyle();
  
  test('formats basic input correctly', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Task': 'Explain photosynthesis'
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('role: Educational content writer');
    expect(result).toContain('task: Explain photosynthesis');
  });
  
  test('ignores empty values', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Context': ''
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('role: Educational content writer');
    expect(result).not.toContain('context:');
  });
  
  test('respects custom order', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Task': 'Explain photosynthesis'
    };
    
    const result = style.format(inputMap, ['Task', 'Role']);
    
    // The Task should come before Role in the output
    expect(result.indexOf('task:')).toBeLessThan(result.indexOf('role:'));
  });
  
  test('handles multi-line content', () => {
    const inputMap = {
      'Constraints': '- Use simple language.\n- Include analogies.\n- Limit to 500 words.'
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('constraints: |');
    expect(result).toContain('  - Use simple language.');
    expect(result).toContain('  - Include analogies.');
    expect(result).toContain('  - Limit to 500 words.');
  });
});

describe('JsonPromptStyle', () => {
  const style = new JsonPromptStyle();
  
  test('formats basic input correctly', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Task': 'Explain photosynthesis'
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('"role": "Educational content writer"');
    expect(result).toContain('"task": "Explain photosynthesis"');
  });
  
  test('ignores empty values', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Context': ''
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('"role": "Educational content writer"');
    expect(result).not.toContain('"context":');
  });
  
  test('respects custom order', () => {
    const inputMap = {
      'Role': 'Educational content writer',
      'Task': 'Explain photosynthesis'
    };
    
    const result = style.format(inputMap, ['Task', 'Role']);
    
    // The Task should come before Role in the output
    expect(result.indexOf('"task":')).toBeLessThan(result.indexOf('"role":'));
  });
  
  test('formats multi-line constraints as array', () => {
    const inputMap = {
      'Constraints': '- Use simple language.\n- Include analogies.\n- Limit to 500 words.'
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('"constraints": [');
    expect(result).toContain('"Use simple language."');
    expect(result).toContain('"Include analogies."');
    expect(result).toContain('"Limit to 500 words."');
  });
  
  test('escapes quotes in values', () => {
    const inputMap = {
      'Task': 'Explain "photosynthesis" process'
    };
    
    const result = style.format(inputMap);
    
    expect(result).toContain('"task": "Explain \\"photosynthesis\\" process"');
  });
});