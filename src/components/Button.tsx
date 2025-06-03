import React from 'react';

/**
 * Props for the Button component
 */
interface ButtonProps {
  /** Text to display on the button */
  children: React.ReactNode;
  /** Function to call when the button is clicked */
  onClick: () => void;
  /** Whether the button is in a loading/processing state */
  isLoading?: boolean;
  /** Whether the button is disabled */
  disabled?: boolean;
  /** Optional CSS class name for additional styling */
  className?: string;
  /** Optional data-testid for testing */
  testId?: string;
}

/**
 * A reusable button component with loading state support
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  isLoading = false,
  disabled = false,
  className = '',
  testId = 'button',
}) => {
  return (
    <button
      className={`promptosaurus-button ${className}`}
      onClick={onClick}
      disabled={disabled || isLoading}
      data-testid={testId}
    >
      {isLoading ? 'Processing...' : children}
    </button>
  );
};

export default Button;