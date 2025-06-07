import React, { useRef, useState, useEffect } from 'react';
import '../styles/MainPanel.css';
import useAutoResizeTextarea from '../hooks/useAutoResizeTextarea';
import { usePlatform } from '../services/platformContext';
import Notification from './Notification';

const MainPanel: React.FC = () => {
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
  
  // Load saved data on component mount
  useEffect(() => {
    const loadSavedData = async () => {
      try {
        const savedData = await platformService.loadData();
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setFormData(parsedData);
          
          // Update textarea values
          if (roleTextareaRef.current) roleTextareaRef.current.value = parsedData.role || '';
          if (taskTextareaRef.current) taskTextareaRef.current.value = parsedData.task || '';
          if (contextTextareaRef.current) contextTextareaRef.current.value = parsedData.context || '';
          if (constraintsTextareaRef.current) constraintsTextareaRef.current.value = parsedData.constraints || '';
        }
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    };
    
    loadSavedData();
  }, [platformService]);
  
  // Handle input changes and save data
  const handleInputChange = async (field: keyof typeof formData, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    
    try {
      await platformService.saveData(JSON.stringify(updatedData));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };
  
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
            </div>
          </div>
        </div>
  );
};

export default MainPanel;