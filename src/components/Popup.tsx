import React, { useEffect } from 'react';

/**
 * Props for the Popup component
 */
interface PopupProps {
  /** Whether the popup is visible */
  show: boolean;
  /** Message to display in the popup */
  message: string;
  /** Function to call to hide the popup */
  onHide: () => void;
  /** Duration in milliseconds before auto-hiding the popup */
  duration?: number;
  /** Optional CSS class name for additional styling */
  className?: string;
}

/**
 * A reusable popup notification component with auto-hide functionality
 */
const Popup: React.FC<PopupProps> = ({
  show,
  message,
  onHide,
  duration = 2000,
  className = '',
}) => {
  // Auto-hide the popup after the specified duration
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onHide();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onHide]);

  if (!show) return null;

  return (
    <div className={`popup-message ${className}`} data-testid="popup">
      {message}
    </div>
  );
};

export default Popup;