import React, { useState, useEffect } from 'react';
import './PromptosaurusUI.css';
import { invoke } from '@tauri-apps/api/core';

interface PromptosaurusUIProps {
  // Add any props you might need
}

const PromptosaurusUI: React.FC<PromptosaurusUIProps> = () => {
  // State for each text area
  const [role, setRole] = useState('');
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [constraints, setConstraints] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    setter(e.target.value);
    e.target.style.height = 'auto';
    e.target.style.height = (e.target.scrollHeight) + 'px';
  };
  
  // Function to handle the "Convert to prompt" action
  const handleConvertToPrompt = async () => {
    const inputMap = {
      Role: role,
      Task: task,
      Context: context,
      Constraints: constraints,
    };

    try {
      const result: string = await invoke('process_input', { inputMap: inputMap });
      await navigator.clipboard.writeText(result);
      console.log('Prompt copied to clipboard:', result);
      setShowPopup(true);
    } catch (error) {
      console.error('Error processing input or copying to clipboard:', error);
    }
  };

  // Effect to make the UI fill the entire viewport
  useEffect(() => {
    const setFullHeight = () => {
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
    };
    
    setFullHeight();
    window.addEventListener('resize', setFullHeight);
    
    return () => {
      window.removeEventListener('resize', setFullHeight);
    };
  }, []);

  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 2000); // Popup disappears after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <div className="promptosaurus-container">
      <h1 className="promptosaurus-title">Promptosaurus</h1>
      
      {showPopup && (
        <div className="popup-message">
          Prompt copied to clipboard!
        </div>
      )}

      <div className="promptosaurus-card">
        <label className="promptosaurus-card-label">Role</label>
        <textarea 
          className="promptosaurus-textarea"
          value={role}
          onChange={(e) => handleTextareaChange(e, setRole)}
          placeholder="Enter role..."
          rows={1}
        />
      </div>
      
      <div className="promptosaurus-card">
        <label className="promptosaurus-card-label">Task</label>
        <textarea 
          className="promptosaurus-textarea"
          value={task}
          onChange={(e) => handleTextareaChange(e, setTask)}
          placeholder="Enter task..."
          rows={1}
        />
      </div>
      
      <div className="promptosaurus-card">
        <label className="promptosaurus-card-label">Context</label>
        <textarea 
          className="promptosaurus-textarea"
          value={context}
          onChange={(e) => handleTextareaChange(e, setContext)}
          placeholder="Enter context..."
          rows={1}
        />
      </div>
      
      <div className="promptosaurus-card">
        <label className="promptosaurus-card-label">Constraints</label>
        <textarea 
          className="promptosaurus-textarea"
          value={constraints}
          onChange={(e) => handleTextareaChange(e, setConstraints)}
          placeholder="Enter constraints..."
          rows={1}
        />
      </div>
      
      <button 
        className="promptosaurus-button"
        onClick={handleConvertToPrompt}
      >
        Convert to prompt
      </button>
    </div>
  );
};

export default PromptosaurusUI;