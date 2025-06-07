import React, { useState } from "react";
import "../styles/PromptDialog.css";
import { Prompt, PromptElement, promptElementsToRecord } from "../../src-pwa/promptElements";

/**
 * Props for the PromptDialog component
 */
interface PromptDialogProps {
  /** The prompt to display */
  prompt: Prompt | null;
  /** Callback when dialog is closed */
  onClose: () => void;
  /** Callback when prompt is opened */
  onOpen: (data: Record<string, string>) => void;
  /** Whether the main panel is ready to receive prompt data */
  isMainPanelReady: boolean;
  /** Optional callback when prompt is deleted */
  onDelete?: (promptId: string) => void;
}

/**
 * Dialog component for displaying prompt details and actions
 */
const PromptDialog: React.FC<PromptDialogProps> = ({ 
  prompt, 
  onClose, 
  onOpen,
  isMainPanelReady,
  onDelete
}) => {
  // State to track if dialog is visible
  const [isVisible, setIsVisible] = useState(true);
  
  // Add debugging logs for component props
  React.useEffect(() => {
    console.log('PromptDialog rendered with props:', { 
      promptId: prompt?.id, 
      promptName: prompt?.name,
      isMainPanelReady 
    });
  }, [prompt, isMainPanelReady]);

  // Handle dialog close
  const handleClose = () => {
    setIsVisible(false);
    // Delay actual close to allow animation
    setTimeout(() => {
      onClose();
    }, 300);
  };

  // Handle opening the prompt in the main panel
  const handleOpen = () => {
    console.log('Open button clicked, isMainPanelReady:', isMainPanelReady);
    if (!isMainPanelReady) {
      console.warn('Cannot open prompt: Main panel is not ready');
      alert('Cannot open prompt at this time. Please try again in a moment.');
      return;
    }
    
    if (!prompt) {
      console.warn('Cannot open prompt: No prompt selected');
      return;
    }
    
    try {
      // Convert prompt elements to a record for the main panel
      const promptData = promptElementsToRecord(prompt.elements);
      console.log('Converted prompt data:', promptData);
      
      // Call the onOpen callback with the prompt data
      onOpen(promptData);
      
      // Close the dialog
      handleClose();
    } catch (error) {
      console.error('Error opening prompt:', error);
      alert(`Error opening prompt: ${error}`);
    }
  };

  // Handle deleting the prompt
  const handleDelete = () => {
    if (!prompt) {
      console.warn('Cannot delete prompt: No prompt selected');
      return;
    }

    // Confirm deletion with the user
    if (window.confirm(`Are you sure you want to delete the prompt "${prompt.name}"?`)) {
      if (onDelete) {
        onDelete(prompt.id);
      }
      handleClose();
    }
  };

  // If no prompt is selected, don't render anything
  if (!prompt) return null;

  return (
    <div className={`prompt-dialog-overlay ${isVisible ? 'visible' : 'hidden'}`} onClick={handleClose}>
      <div className="prompt-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="prompt-dialog-header">
          <h2>{prompt.name}</h2>
          <button className="close-button" onClick={handleClose}>×</button>
        </div>
        
        <div className="prompt-dialog-content">
          {prompt.elements.map((element: PromptElement) => (
            <div key={element.id} className="prompt-element">
              <h3>{element.name}</h3>
              <p>{element.content}</p>
            </div>
          ))}
        </div>
        
        <div className="prompt-dialog-actions">
          <button 
            className="prompt-dialog-button cancel-button" 
            onClick={handleClose}
          >
            Cancel
          </button>
          {onDelete && (
            <button 
              className="prompt-dialog-button delete-button" 
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
          <button 
            className="prompt-dialog-button open-button" 
            onClick={handleOpen}
            disabled={!isMainPanelReady}
            title={!isMainPanelReady ? "Main panel is not ready yet" : ""}
          >
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptDialog;