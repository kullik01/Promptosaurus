import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import PromptosaurusUI from '../PromptosaurusUI';

// Mock the PromptForm component
vi.mock('../PromptForm', () => ({
  default: () => <div data-testid="mock-prompt-form">Mock Form</div>,
}));

describe('PromptosaurusUI', () => {
  it('renders the title', () => {
    render(<PromptosaurusUI />);
    
    expect(screen.getByText('Promptosaurus')).toBeInTheDocument();
  });
  
  it('renders the PromptForm component', () => {
    render(<PromptosaurusUI />);
    
    expect(screen.getByTestId('mock-prompt-form')).toBeInTheDocument();
  });
  
  it('sets up the full height effect', () => {
    // Mock the document style properties
    Object.defineProperty(document.documentElement.style, 'height', {
      writable: true,
      value: '',
    });
    
    Object.defineProperty(document.body.style, 'height', {
      writable: true,
      value: '',
    });
    
    // Add and remove event listener spies
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');
    
    const { unmount } = render(<PromptosaurusUI />);
    
    // Check that the styles were set
    expect(document.documentElement.style.height).toBe('100%');
    expect(document.body.style.height).toBe('100%');
    
    // Check that the event listener was added
    expect(addEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    
    // Unmount to test cleanup
    unmount();
    
    // Check that the event listener was removed
    expect(removeEventListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
  });
});