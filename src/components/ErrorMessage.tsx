import React from 'react';

/**
 * Props for the ErrorMessage component
 */
interface ErrorMessageProps {
  /** Error message to display */
  message: string | null;
  /** Optional CSS class name for additional styling */
  className?: string;
}

/**
 * A component for displaying error messages
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  className = '' 
}) => {
  if (!message) return null;

  return (
    <div 
      className={`promptosaurus-error ${className}`} 
      data-testid="error-message"
    >
      {message}
    </div>
  );
};

export default ErrorMessage;