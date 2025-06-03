import React, { useRef, useEffect } from 'react';

/**
 * Props for the TextareaField component
 */
interface TextareaFieldProps {
  /** Label text for the textarea */
  label: string;
  /** Current value of the textarea */
  value: string;
  /** Function to call when the value changes */
  onChange: (value: string) => void;
  /** Placeholder text for the textarea */
  placeholder?: string;
  /** Optional CSS class name for additional styling */
  className?: string;
}

/**
 * A reusable textarea field component with auto-resize functionality
 */
const TextareaField: React.FC<TextareaFieldProps> = ({
  label,
  value,
  onChange,
  placeholder = `Enter ${label.toLowerCase()}...`,
  className = '',
}) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`promptosaurus-card ${className}`}>
      <label className="promptosaurus-card-label">{label}</label>
      <textarea
        ref={textareaRef}
        className="promptosaurus-textarea"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={1}
        data-testid={`${label.toLowerCase()}-textarea`}
      />
    </div>
  );
};

export default TextareaField;