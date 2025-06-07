import React from 'react';
import { Prompt, promptElementsToRecord } from '../../src-pwa';
import { usePlatform } from '../services/platformContext';
import '../styles/PromptDialog.css';

interface PromptDialogProps {
  prompt: Prompt | null;
  onClose: () => void;
  onOpen: (data: Record<string, string>) => void;
}

/**
 * A dialog component that displays the full content of a prompt
 * 
 * @param prompt The prompt to display, or null if no prompt is selected
 * @param onClose Callback function when the dialog is closed
 * @param onOpen Callback function when the "Open" button is clicked
 */
const PromptDialog: React.FC<PromptDialogProps> = ({ prompt, onClose, onOpen }) => {
  const platformService = usePlatform();
  
  if (!prompt) {
    return null;
  }
  
  // Handle copy button click
  const handleCopy = async () => {
    try {
      if (!prompt || !prompt.elements || prompt.elements.length === 0) {
        throw new Error('No prompt data available to copy');
      }
      
      // Convert prompt elements to record format
      const promptData = promptElementsToRecord(prompt.elements);
      
      // Format the prompt as markdown
      const formattedPrompt = await platformService.formatPrompt(promptData, 'markdown');
      
      // Copy to clipboard
      await platformService.copyToClipboard(formattedPrompt);
      
      // Show a temporary message (could use a notification component here)
      alert('Prompt copied to clipboard!');
    } catch (error) {
      console.error('Error copying prompt:', error);
      alert(`Failed to copy prompt to clipboard: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  // Handle open button click
  const handleOpen = () => {
    try {
      if (!prompt || !prompt.elements || prompt.elements.length === 0) {
        throw new Error('No prompt data available to open');
      }
      
      // Convert prompt elements to record format and pass to parent component
      const promptData = promptElementsToRecord(prompt.elements);
      
      // Verify promptData has required fields before opening
      if (!promptData || Object.keys(promptData).length === 0) {
        throw new Error('Prompt data is empty or invalid');
      }
      
      onOpen(promptData);
      onClose(); // Close the dialog after opening
    } catch (error) {
      console.error('Error opening prompt:', error);
      alert(`Failed to open prompt: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };
  
  return (
    <div className="prompt-dialog-overlay" onClick={onClose}>
      <div className="prompt-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="prompt-dialog-header">
          <h2 className="prompt-dialog-title">{prompt.name}</h2>
          <button className="prompt-dialog-close" onClick={onClose}>×</button>
        </div>
        
        {prompt.description && (
          <div className="prompt-dialog-description">
            {prompt.description}
          </div>
        )}
        
        <div className="prompt-dialog-content">
          {prompt.elements.map((element) => (
            <div key={element.id} className="prompt-dialog-element">
              <h3 className="prompt-dialog-element-title">{element.name}</h3>
              <div className="prompt-dialog-element-content">
                {element.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="prompt-dialog-footer">
          <button className="prompt-dialog-button" onClick={handleCopy}>
            Copy
          </button>
          <button className="prompt-dialog-button primary" onClick={handleOpen}>
            Open
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptDialog;