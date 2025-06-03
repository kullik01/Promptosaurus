import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import PromptForm from '../PromptForm';
import { usePromptStore } from '../../store/promptStore';

// Mock the Zustand store
vi.mock('../../store/promptStore', () => ({
  usePromptStore: vi.fn(),
}));

describe('PromptForm', () => {
  const mockStore = {
    role: '',
    task: '',
    context: '',
    constraints: '',
    showPopup: false,
    isProcessing: false,
    error: null,
    setRole: vi.fn(),
    setTask: vi.fn(),
    setContext: vi.fn(),
    setConstraints: vi.fn(),
    convertToPrompt: vi.fn(),
    setShowPopup: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (usePromptStore as any).mockImplementation(() => mockStore);
  });

  it('renders all textarea fields', () => {
    render(<PromptForm />);
    
    expect(screen.getByTestId('role-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('task-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('context-textarea')).toBeInTheDocument();
    expect(screen.getByTestId('constraints-textarea')).toBeInTheDocument();
  });

  it('renders the convert button', () => {
    render(<PromptForm />);
    
    expect(screen.getByTestId('convert-button')).toBeInTheDocument();
    expect(screen.getByText('Convert to prompt')).toBeInTheDocument();
  });

  it('calls convertToPrompt when the button is clicked', () => {
    render(<PromptForm />);
    
    fireEvent.click(screen.getByTestId('convert-button'));
    
    expect(mockStore.convertToPrompt).toHaveBeenCalledTimes(1);
  });

  it('shows the popup when showPopup is true', () => {
    (usePromptStore as any).mockImplementation(() => ({
      ...mockStore,
      showPopup: true,
    }));
    
    render(<PromptForm />);
    
    expect(screen.getByTestId('popup')).toBeInTheDocument();
    expect(screen.getByText('Prompt copied to clipboard!')).toBeInTheDocument();
  });

  it('does not show the popup when showPopup is false', () => {
    render(<PromptForm />);
    
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });

  it('shows error message when error is present', () => {
    (usePromptStore as any).mockImplementation(() => ({
      ...mockStore,
      error: 'Test Error',
    }));
    
    render(<PromptForm />);
    
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('does not show error message when error is null', () => {
    render(<PromptForm />);
    
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });

  it('disables the button when isProcessing is true', () => {
    (usePromptStore as any).mockImplementation(() => ({
      ...mockStore,
      isProcessing: true,
    }));
    
    render(<PromptForm />);
    
    expect(screen.getByTestId('convert-button')).toBeDisabled();
    expect(screen.getByText('Processing...')).toBeInTheDocument();
  });
});