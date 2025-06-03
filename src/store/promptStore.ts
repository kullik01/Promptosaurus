import { create } from 'zustand';
import { invoke } from '@tauri-apps/api/core';

/**
 * Interface defining the structure of the prompt state
 */
interface PromptState {
  // Input fields
  role: string;
  task: string;
  context: string;
  constraints: string;
  
  // UI state
  showPopup: boolean;
  isProcessing: boolean;
  error: string | null;
  
  // Actions
  setRole: (role: string) => void;
  setTask: (task: string) => void;
  setContext: (context: string) => void;
  setConstraints: (constraints: string) => void;
  resetForm: () => void;
  convertToPrompt: () => Promise<void>;
  setShowPopup: (show: boolean) => void;
}

/**
 * Zustand store for managing prompt state and actions
 */
export const usePromptStore = create<PromptState>((set, get) => ({
  // Initial state
  role: '',
  task: '',
  context: '',
  constraints: '',
  showPopup: false,
  isProcessing: false,
  error: null,
  
  // Actions
  setRole: (role) => set({ role }),
  setTask: (task) => set({ task }),
  setContext: (context) => set({ context }),
  setConstraints: (constraints) => set({ constraints }),
  
  resetForm: () => set({
    role: '',
    task: '',
    context: '',
    constraints: '',
  }),
  
  setShowPopup: (show) => set({ showPopup: show }),
  
  convertToPrompt: async () => {
    const { role, task, context, constraints } = get();
    
    set({ isProcessing: true, error: null });
    
    try {
      const inputMap = {
        Role: role,
        Task: task,
        Context: context,
        Constraints: constraints,
      };
      
      const result: string = await invoke('process_input', { inputMap });
      await navigator.clipboard.writeText(result);
      
      set({ showPopup: true, isProcessing: false });
      
      // Auto-hide popup after 2 seconds
      setTimeout(() => {
        set({ showPopup: false });
      }, 2000);
      
      return result;
    } catch (error) {
      console.error('Error processing input or copying to clipboard:', error);
      set({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred', 
        isProcessing: false 
      });
    }
  },
}));