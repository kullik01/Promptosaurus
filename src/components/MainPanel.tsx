import React, { useRef, useState, useEffect } from 'react';
import '../styles/MainPanel.css';
import useAutoResizeTextarea from '../hooks/useAutoResizeTextarea';
import { usePlatform } from '../services/platformContext';

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
  
  return (
    <div className="main-panel">
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
              <button className="format-button">Markdown</button>
              <button className="format-button">XML</button>
              <button className="format-button">YAML</button>
              <button className="format-button">JSON</button>
            </div>
          </div>
        </div>
  );
};

export default MainPanel;