import React, { useRef } from 'react';
import '../styles/MainPanel.css';
import useAutoResizeTextarea from '../hooks/useAutoResizeTextarea';

const MainPanel: React.FC = () => {
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
  
  return (
    <div className="main-panel">
          <div className="form-field">
            <label>Role</label>
            <textarea 
              ref={roleTextareaRef}
              className="form-textarea" 
              placeholder="Enter role information"
            ></textarea>
          </div>
          
          <div className="form-field">
            <label>Task</label>
            <textarea 
              ref={taskTextareaRef}
              className="form-textarea" 
              placeholder="Enter task details"
            ></textarea>
          </div>
          
          <div className="form-field">
            <label>Context</label>
            <textarea 
              ref={contextTextareaRef}
              className="form-textarea" 
              placeholder="Enter context information"
            ></textarea>
          </div>
          
          <div className="form-field">
            <label>Constraints</label>
            <textarea 
              ref={constraintsTextareaRef}
              className="form-textarea" 
              placeholder="Enter constraints"
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