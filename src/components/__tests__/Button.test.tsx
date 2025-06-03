import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../Button';

describe('Button', () => {
  it('renders with the correct text', () => {
    render(
      <Button onClick={() => {}}>
        Test Button
      </Button>
    );
    
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    
    render(
      <Button onClick={handleClick}>
        Test Button
      </Button>
    );
    
    fireEvent.click(screen.getByText('Test Button'));
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
  
  it('shows loading text when isLoading is true', () => {
    render(
      <Button onClick={() => {}} isLoading={true}>
        Test Button
      </Button>
    );
    
    expect(screen.getByText('Processing...')).toBeInTheDocument();
    expect(screen.queryByText('Test Button')).not.toBeInTheDocument();
  });
  
  it('is disabled when disabled prop is true', () => {
    render(
      <Button onClick={() => {}} disabled={true}>
        Test Button
      </Button>
    );
    
    expect(screen.getByTestId('button')).toBeDisabled();
  });
  
  it('is disabled when isLoading is true', () => {
    render(
      <Button onClick={() => {}} isLoading={true}>
        Test Button
      </Button>
    );
    
    expect(screen.getByTestId('button')).toBeDisabled();
  });
  
  it('applies custom className when provided', () => {
    render(
      <Button onClick={() => {}} className="custom-class">
        Test Button
      </Button>
    );
    
    expect(screen.getByTestId('button')).toHaveClass('custom-class');
  });
  
  it('uses custom testId when provided', () => {
    render(
      <Button onClick={() => {}} testId="custom-button">
        Test Button
      </Button>
    );
    
    expect(screen.getByTestId('custom-button')).toBeInTheDocument();
  });
});