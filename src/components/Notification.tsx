import React, { useEffect } from 'react';
import '../styles/Notification.css';

interface NotificationProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  isVisible: boolean;
  onClose: () => void;
}

/**
 * A temporary notification component that appears and disappears automatically
 * 
 * @param message The message to display in the notification
 * @param type The type of notification (success, error, info)
 * @param duration How long the notification should be visible (in milliseconds)
 * @param isVisible Whether the notification is currently visible
 * @param onClose Callback function to close the notification
 */
const Notification: React.FC<NotificationProps> = ({
  message,
  type = 'success',
  duration = 3000,
  isVisible,
  onClose
}) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);
  
  if (!isVisible) return null;
  
  return (
    <div className={`notification notification-${type}`}>
      <div className="notification-content">
        {type === 'success' && <span className="notification-icon">✓</span>}
        {type === 'error' && <span className="notification-icon">✗</span>}
        {type === 'info' && <span className="notification-icon">ℹ</span>}
        <span className="notification-message">{message}</span>
      </div>
    </div>
  );
};

export default Notification;