import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import Popup from '../Popup';

describe('Popup', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  
  afterEach(() => {
    vi.useRealTimers();
  });
  
  it('renders when show is true', () => {
    render(
      <Popup
        show={true}
        message="Test Message"
        onHide={() => {}}
      />
    );
    
    expect(screen.getByTestId('popup')).toBeInTheDocument();
    expect(screen.getByText('Test Message')).toBeInTheDocument();
  });
  
  it('does not render when show is false', () => {
    render(
      <Popup
        show={false}
        message="Test Message"
        onHide={() => {}}
      />
    );
    
    expect(screen.queryByTestId('popup')).not.toBeInTheDocument();
  });
  
  it('calls onHide after the specified duration', () => {
    const handleHide = vi.fn();
    
    render(
      <Popup
        show={true}
        message="Test Message"
        onHide={handleHide}
        duration={1000}
      />
    );
    
    expect(handleHide).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(1000);
    
    expect(handleHide).toHaveBeenCalledTimes(1);
  });
  
  it('uses the default duration of 2000ms if not specified', () => {
    const handleHide = vi.fn();
    
    render(
      <Popup
        show={true}
        message="Test Message"
        onHide={handleHide}
      />
    );
    
    vi.advanceTimersByTime(1999);
    expect(handleHide).not.toHaveBeenCalled();
    
    vi.advanceTimersByTime(1);
    expect(handleHide).toHaveBeenCalledTimes(1);
  });
  
  it('applies custom className when provided', () => {
    render(
      <Popup
        show={true}
        message="Test Message"
        onHide={() => {}}
        className="custom-class"
      />
    );
    
    expect(screen.getByTestId('popup')).toHaveClass('custom-class');
  });
});