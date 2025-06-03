import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage', () => {
  it('renders when a message is provided', () => {
    render(
      <ErrorMessage message="Test Error" />
    );
    
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });
  
  it('does not render when message is null', () => {
    render(
      <ErrorMessage message={null} />
    );
    
    expect(screen.queryByTestId('error-message')).not.toBeInTheDocument();
  });
  
  it('applies custom className when provided', () => {
    render(
      <ErrorMessage message="Test Error" className="custom-class" />
    );
    
    expect(screen.getByTestId('error-message')).toHaveClass('custom-class');
  });
});