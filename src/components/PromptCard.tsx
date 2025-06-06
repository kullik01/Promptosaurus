import React from 'react';
import { Prompt } from 'src-pwa';
import '../styles/PromptCard.css';

interface PromptCardProps {
  prompt: Prompt;
  onClick: (prompt: Prompt) => void;
  onDelete?: (promptId: string) => void;
}

/**
 * A card component that displays a preview of a saved prompt
 * 
 * @param prompt The prompt to display
 * @param onClick Callback function when the card is clicked
 * @param onDelete Optional callback function when the delete button is clicked
 */
const PromptCard: React.FC<PromptCardProps> = ({ prompt, onClick, onDelete }) => {
  // Get the first element content for preview
  const getPreviewContent = (): string => {
    if (!prompt.elements || prompt.elements.length === 0) {
      return 'No content';
    }
    
    // Find the first element with content
    const elementWithContent = prompt.elements.find(element => element.content.trim().length > 0);
    
    if (!elementWithContent) {
      return 'No content';
    }
    
    // Limit preview to 100 characters
    const content = elementWithContent.content;
    return content.length > 100 ? content.substring(0, 97) + '...' : content;
  };
  
  // Format the date to a readable string
  const formatDate = (date: Date): string => {
    if (!(date instanceof Date)) {
      // If date is a string, convert it to Date object
      date = new Date(date);
    }
    return date.toLocaleDateString();
  };

  // Handle delete button click
  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card click event from firing
    if (onDelete) {
      onDelete(prompt.id);
    }
  };
  
  return (
    <div className="prompt-card" onClick={() => onClick(prompt)}>
      <div className="prompt-card-header">
        <h3 className="prompt-card-title">{prompt.name}</h3>
        {onDelete && (
          <button 
            className="prompt-card-delete-button" 
            onClick={handleDeleteClick}
            aria-label="Delete prompt"
          >
            ×
          </button>
        )}
      </div>
      <p className="prompt-card-preview">{getPreviewContent()}</p>
      <div className="prompt-card-footer">
        <span className="prompt-card-date">Updated: {formatDate(prompt.updatedAt)}</span>
      </div>
    </div>
  );
};

export default PromptCard;