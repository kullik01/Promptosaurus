import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TextareaField from '../TextareaField';

describe('TextareaField', () => {
  it('renders with the correct label', () => {
    render(
      <TextareaField
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    );
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });
  
  it('displays the provided value', () => {
    render(
      <TextareaField
        label="Test Label"
        value="Test Value"
        onChange={() => {}}
      />
    );
    
    expect(screen.getByTestId('test label-textarea')).toHaveValue('Test Value');
  });
  
  it('calls onChange when the value changes', () => {
    const handleChange = vi.fn();
    
    render(
      <TextareaField
        label="Test Label"
        value=""
        onChange={handleChange}
      />
    );
    
    const textarea = screen.getByTestId('test label-textarea');
    fireEvent.change(textarea, { target: { value: 'New Value' } });
    
    expect(handleChange).toHaveBeenCalledWith('New Value');
  });
  
  it('uses the default placeholder if none is provided', () => {
    render(
      <TextareaField
        label="Test Label"
        value=""
        onChange={() => {}}
      />
    );
    
    expect(screen.getByPlaceholderText('Enter test label...')).toBeInTheDocument();
  });
  
  it('uses a custom placeholder when provided', () => {
    render(
      <TextareaField
        label="Test Label"
        value=""
        onChange={() => {}}
        placeholder="Custom placeholder"
      />
    );
    
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument();
  });
});