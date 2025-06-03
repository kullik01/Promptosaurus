import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePromptStore } from '../promptStore';
import { invoke } from '@tauri-apps/api/core';

// Mock the Tauri invoke function
vi.mock('@tauri-apps/api/core', () => ({
  invoke: vi.fn(),
}));

// Mock the clipboard API
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn(),
  },
});

// Mock setTimeout
vi.useFakeTimers();

describe('promptStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the store to its initial state
    const store = usePromptStore.getState();
    store.resetForm();
    store.setShowPopup(false);
    usePromptStore.setState({ error: null, isProcessing: false });
  });

  it('initializes with default values', () => {
    const state = usePromptStore.getState();
    
    expect(state.role).toBe('');
    expect(state.task).toBe('');
    expect(state.context).toBe('');
    expect(state.constraints).toBe('');
    expect(state.showPopup).toBe(false);
    expect(state.isProcessing).toBe(false);
    expect(state.error).toBe(null);
  });

  it('updates role state', () => {
    const { setRole } = usePromptStore.getState();
    
    setRole('Test Role');
    
    expect(usePromptStore.getState().role).toBe('Test Role');
  });

  it('updates task state', () => {
    const { setTask } = usePromptStore.getState();
    
    setTask('Test Task');
    
    expect(usePromptStore.getState().task).toBe('Test Task');
  });

  it('updates context state', () => {
    const { setContext } = usePromptStore.getState();
    
    setContext('Test Context');
    
    expect(usePromptStore.getState().context).toBe('Test Context');
  });

  it('updates constraints state', () => {
    const { setConstraints } = usePromptStore.getState();
    
    setConstraints('Test Constraints');
    
    expect(usePromptStore.getState().constraints).toBe('Test Constraints');
  });

  it('resets the form', () => {
    const { setRole, setTask, setContext, setConstraints, resetForm } = usePromptStore.getState();
    
    setRole('Test Role');
    setTask('Test Task');
    setContext('Test Context');
    setConstraints('Test Constraints');
    
    resetForm();
    
    const state = usePromptStore.getState();
    expect(state.role).toBe('');
    expect(state.task).toBe('');
    expect(state.context).toBe('');
    expect(state.constraints).toBe('');
  });

  it('updates showPopup state', () => {
    const { setShowPopup } = usePromptStore.getState();
    
    setShowPopup(true);
    
    expect(usePromptStore.getState().showPopup).toBe(true);
  });

  it('successfully converts to prompt', async () => {
    // Setup the store with test values
    const { setRole, setTask, setContext, setConstraints, convertToPrompt } = usePromptStore.getState();
    
    setRole('Test Role');
    setTask('Test Task');
    setContext('Test Context');
    setConstraints('Test Constraints');
    
    // Mock the invoke function to return a successful result
    (invoke as any).mockResolvedValue('Formatted Prompt');
    
    // Call the convertToPrompt function
    await convertToPrompt();
    
    // Check that invoke was called with the correct parameters
    expect(invoke).toHaveBeenCalledWith('process_input', {
      inputMap: {
        Role: 'Test Role',
        Task: 'Test Task',
        Context: 'Test Context',
        Constraints: 'Test Constraints',
      },
    });
    
    // Check that the clipboard API was called with the result
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Formatted Prompt');
    
    // Check that showPopup was set to true
    expect(usePromptStore.getState().showPopup).toBe(true);
    
    // Check that isProcessing was set back to false
    expect(usePromptStore.getState().isProcessing).toBe(false);
    
    // Advance timers to check auto-hide behavior
    vi.advanceTimersByTime(2000);
    
    // Check that showPopup was set back to false
    expect(usePromptStore.getState().showPopup).toBe(false);
  });

  it('handles errors during conversion', async () => {
    // Setup the store with test values
    const { setRole, setTask, setContext, setConstraints, convertToPrompt } = usePromptStore.getState();
    
    setRole('Test Role');
    setTask('Test Task');
    setContext('Test Context');
    setConstraints('Test Constraints');
    
    // Mock the invoke function to throw an error
    const testError = new Error('Test Error');
    (invoke as any).mockRejectedValue(testError);
    
    // Call the convertToPrompt function
    await convertToPrompt();
    
    // Check that invoke was called with the correct parameters
    expect(invoke).toHaveBeenCalledWith('process_input', {
      inputMap: {
        Role: 'Test Role',
        Task: 'Test Task',
        Context: 'Test Context',
        Constraints: 'Test Constraints',
      },
    });
    
    // Check that the clipboard API was not called
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
    
    // Check that showPopup was not set to true
    expect(usePromptStore.getState().showPopup).toBe(false);
    
    // Check that isProcessing was set back to false
    expect(usePromptStore.getState().isProcessing).toBe(false);
    
    // Check that the error was set
    expect(usePromptStore.getState().error).toBe('Test Error');
  });
});