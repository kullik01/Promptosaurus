import { useEffect, RefObject } from 'react';

/**
 * A custom hook that automatically resizes a textarea element based on its content
 * up to a maximum height, after which it will show a scrollbar.
 * 
 * @param textareaRef - A React ref object pointing to a textarea element
 */
const useAutoResizeTextarea = (textareaRef: RefObject<HTMLTextAreaElement>): void => {
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Function to adjust the height of the textarea
    const adjustHeight = () => {
      // Reset the height to auto to get the correct scrollHeight
      textarea.style.height = 'auto';
      
      // Set the height to the scrollHeight to fit the content
      // The max-height in CSS will handle the scrollbar when it exceeds that value
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
    };

    // Initial adjustment
    adjustHeight();

    // Add event listeners for input and focus events
    textarea.addEventListener('input', adjustHeight);
    textarea.addEventListener('focus', adjustHeight);

    // Cleanup function to remove event listeners
    return () => {
      textarea.removeEventListener('input', adjustHeight);
      textarea.removeEventListener('focus', adjustHeight);
    };
  }, [textareaRef]);
};

export default useAutoResizeTextarea;