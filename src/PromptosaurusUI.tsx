import React, { useState, useEffect } from 'react';
import './PromptosaurusUI.css';
import { invoke } from '@tauri-apps/api/core';
import { processInput as processInputTs, PromptFormat as PromptFormatTs } from './api';

interface PromptosaurusUIProps {
  // Add any props you might need
}

// Define the available prompt formats
enum PromptFormat {
  Xml = 'Xml',
  Markdown = 'Markdown',
  Yaml = 'Yaml',
  Json = 'Json',
}

const PromptosaurusUI: React.FC<PromptosaurusUIProps> = () => {
  // State for each text area
  const [role, setRole] = useState('');
  const [task, setTask] = useState('');
  const [context, setContext] = useState('');
  const [constraints, setConstraints] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [promptFormat, setPromptFormat] = useState<PromptFormat>(PromptFormat.Xml);
  const [isPwa, setIsPwa] = useState(false);

  // Check if running as PWA or Tauri app
  useEffect(() => {
    // If window.tauri is undefined, we're running as a PWA
    const checkEnvironment = async () => {
      try {
        // Try to access Tauri API
        await invoke('process_input', { inputMap: {}, format: PromptFormat.Xml });
        setIsPwa(false);
      } catch (error) {
        // If invoke fails, we're running as a PWA
        setIsPwa(true);
      }
    };
    
    checkEnvironment();
  }, []);

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
      let result: string;
      
      if (isPwa) {
        // Use TypeScript implementation for PWA
        result = await processInputTs(inputMap, promptFormat as unknown as PromptFormatTs);
      } else {
        // Use Rust backend for Tauri app
        result = await invoke('process_input', { 
          inputMap: inputMap,
          format: promptFormat
        });
      }
      
      await navigator.clipboard.writeText(result);
      console.log('Prompt copied to clipboard:', result);
      setShowPopup(true);
    } catch (error) {
      console.error('Error processing input or copying to clipboard:', error);
    }
  };
  
  // Handle format selection change
  const handleFormatChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPromptFormat(e.target.value as PromptFormat);
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
      <h1 className="promptosaurus-title">Promptosaurus {isPwa ? '(PWA)' : ''}</h1>
      
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
      
      <div className="promptosaurus-format-selector">
        <label htmlFor="format-select">Prompt Format:</label>
        <select 
          id="format-select" 
          value={promptFormat}
          onChange={handleFormatChange}
          className="promptosaurus-select"
        >
          <option value={PromptFormat.Xml}>XML</option>
          <option value={PromptFormat.Markdown}>Markdown</option>
          <option value={PromptFormat.Yaml}>YAML</option>
          <option value={PromptFormat.Json}>JSON</option>
        </select>
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