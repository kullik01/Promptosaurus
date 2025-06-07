import React, { useRef, useState, useCallback } from 'react';
import '../styles/MainPanel.css';
import useAutoResizeTextarea from '../hooks/useAutoResizeTextarea';
import { usePlatform } from '../services/platformContext';
import Notification from './Notification';

/**
 * Props for the MainPanel component
 */
interface MainPanelProps {
  /** Optional callback to receive the loadPromptData function */
  onLoadPromptDataReady?: (loadFn: (data: Record<string, string>) => void) => void;
  /** Optional callback to notify parent when a prompt is saved */
  onPromptSaved?: () => void;
}

/**
 * MainPanel component displays the main form for creating and editing prompts
 */
const MainPanel: React.FC<MainPanelProps> = ({ onLoadPromptDataReady, onPromptSaved }) => {
  // Get platform service for data persistence
  const platformService = usePlatform();
  
  // State for form data
  const [formData, setFormData] = useState({
    role: '',
    task: '',
    context: '',
    constraints: ''
  });
  
  // State for notification
  const [notification, setNotification] = useState({
    message: '',
    type: 'success' as 'success' | 'error' | 'info',
    isVisible: false
  });

  // State for prompt name input
  const [promptName, setPromptName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  
  // Create refs for each textarea
  const roleTextareaRef = useRef<HTMLTextAreaElement>(null);
  const taskTextareaRef = useRef<HTMLTextAreaElement>(null);
  const contextTextareaRef = useRef<HTMLTextAreaElement>(null);
  const constraintsTextareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Apply the auto-resize hook to each textarea
  useAutoResizeTextarea(roleTextareaRef);
  useAutoResizeTextarea(taskTextareaRef);
  useAutoResizeTextarea(contextTextareaRef);
  useAutoResizeTextarea(constraintsTextareaRef);
  
  // Handle input changes and save data
  const handleInputChange = async (field: keyof typeof formData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
  };
  
  /**
   * Loads prompt data into the form fields
   * This method is passed to the LeftSidebar component to handle opening saved prompts
   * 
   * @param data - Record containing prompt element data
   */
  const loadPromptData = useCallback((data: Record<string, string>) => {
    // Create a new form data object with the provided data
    const newFormData = { ...formData };
    
    // Add null/undefined check before accessing data properties
    if (!data) {
      console.warn('Attempted to load null or undefined prompt data');
      // Removed the notification for no prompt data available
      return;
    }
    
    // Update each field if it exists in the data
    if (data.role !== undefined) newFormData.role = data.role;
    if (data.task !== undefined) newFormData.task = data.task;
    if (data.context !== undefined) newFormData.context = data.context;
    if (data.constraints !== undefined) newFormData.constraints = data.constraints;
    
    // Update the form state
    setFormData(newFormData);
    
    // Show a notification
    setNotification({
      message: 'Prompt loaded successfully!',
      type: 'info',
      isVisible: true
    });
  }, [formData]);
  
  // Provide the loadPromptData function to the parent component
  React.useEffect(() => {
    if (onLoadPromptDataReady) {
      onLoadPromptDataReady(loadPromptData);
    }
  }, [onLoadPromptDataReady, loadPromptData]);
  
  // Format and copy prompt to clipboard
  const handleFormatPrompt = async (format: string) => {
    try {
      // Format the prompt using the platform service
      const formattedPrompt = await platformService.formatPrompt(formData, format);
      console.info('Formatted prompt:', formattedPrompt);
      // Copy to clipboard
      await platformService.copyToClipboard(formattedPrompt);
      
      // Show a temporary success notification
      setNotification({
        message: `Prompt copied to clipboard in ${format.toUpperCase()} format!`,
        type: 'success',
        isVisible: true
      });
    } catch (error) {
      console.error(`Error formatting prompt as ${format}:`, error);
      
      // Show error notification
      setNotification({
        message: `Failed to format prompt: ${error}`,
        type: 'error',
        isVisible: true
      });
    }
  };

  // Handle saving the prompt
  const handleSavePrompt = async () => {
    console.log('handleSavePrompt called');
    // Show the name input field
    setShowNameInput(true);
  };

  // Handle the actual save operation
  const handleSaveConfirm = async () => {
    if (!promptName.trim()) {
      setNotification({
        message: 'Please enter a name for your prompt',
        type: 'error',
        isVisible: true
      });
      return;
    }

    try {
      // Save the prompt using the platform service
      await platformService.savePrompt(
        undefined, // No promptId means create a new prompt
        promptName,
        formData,
        '' // No description for now
      );
      
      // Reset the name input
      setPromptName('');
      setShowNameInput(false);
      
      // Show a success notification
      setNotification({
        message: 'Prompt saved successfully!',
        type: 'success',
        isVisible: true
      });
      // Notify parent component that a prompt has been saved
      if (onPromptSaved) {
        onPromptSaved();
      }
    } catch (error) {
      console.error('Error saving prompt:', error);
      
      // Show error notification
      setNotification({
        message: `Failed to save prompt: ${error}`,
        type: 'error',
        isVisible: true
      });
    }
  };

  // Handle canceling the save operation
  const handleSaveCancel = () => {
    setPromptName('');
    setShowNameInput(false);
  };
  
  // Close notification
  const handleCloseNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };
  
  return (
    <div className="main-panel">
      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={handleCloseNotification}
      />
      <div className="form-field">
        <label>Role</label>
        <textarea 
          ref={roleTextareaRef}
          className="form-textarea" 
          placeholder="Enter role information"
          defaultValue={formData.role}
          onChange={(e) => handleInputChange('role', e.target.value)}
        ></textarea>
      </div>
      
      <div className="form-field">
        <label>Task</label>
        <textarea 
          ref={taskTextareaRef}
          className="form-textarea" 
          placeholder="Enter task details"
          defaultValue={formData.task}
          onChange={(e) => handleInputChange('task', e.target.value)}
        ></textarea>
      </div>
      
      <div className="form-field">
        <label>Context</label>
        <textarea 
          ref={contextTextareaRef}
          className="form-textarea" 
          placeholder="Enter context information"
          defaultValue={formData.context}
          onChange={(e) => handleInputChange('context', e.target.value)}
        ></textarea>
      </div>
      
      <div className="form-field">
        <label>Constraints</label>
        <textarea 
          ref={constraintsTextareaRef}
          className="form-textarea" 
          placeholder="Enter constraints"
          defaultValue={formData.constraints}
          onChange={(e) => handleInputChange('constraints', e.target.value)}
        ></textarea>
      </div>
      
      <div className="format-conversion">
        <p>Convert prompt to</p>
        <div className="format-buttons">
          <button 
            className="format-button" 
            onClick={() => handleFormatPrompt('markdown')}
          >
            Markdown
          </button>
          <button 
            className="format-button" 
            onClick={() => handleFormatPrompt('xml')}
          >
            XML
          </button>
          <button 
            className="format-button" 
            onClick={() => handleFormatPrompt('yaml')}
          >
            YAML
          </button>
          <button 
            className="format-button" 
            onClick={() => handleFormatPrompt('json')}
          >
            JSON
          </button>
          <button 
            className="format-button save-button" 
            onClick={handleSavePrompt}
          >
            Save
          </button>
        </div>

        {showNameInput && (
          <div className="save-prompt-container">
            <input
              type="text"
              className="form-input"
              placeholder="Enter prompt name"
              value={promptName}
              onChange={(e) => setPromptName(e.target.value)}
              autoFocus
            />
            <div className="save-actions">
              <button 
                className="format-button" 
                onClick={handleSaveConfirm}
              >
                Confirm
              </button>
              <button 
                className="format-button" 
                onClick={handleSaveCancel}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPanel;