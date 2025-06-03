import React from 'react';
import { usePromptStore } from '../store/promptStore';
import TextareaField from './TextareaField';

/**
 * PromptForm component for creating and managing prompts
 */
const PromptForm: React.FC = () => {
  const {
    role,
    task,
    context,
    constraints,
    showPopup,
    isProcessing,
    error,
    setRole,
    setTask,
    setContext,
    setConstraints,
    convertToPrompt,
    setShowPopup
  } = usePromptStore();

  return (
    <div className="promptosaurus-container">
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
          onChange={(e) => setRole(e.target.value)}
          placeholder="Enter role..."
          rows={1}
        />
      </div>
      
      <div className="promptosaurus-card">
        <label className="promptosaurus-card-label">Task</label>
        <textarea 
          className="promptosaurus-textarea"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Enter task..."
          rows={1}
        />
      </div>
      
      <div className="promptosaurus-card">
        <label className="promptosaurus-card-label">Context</label>
        <textarea 
          className="promptosaurus-textarea"
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Enter context..."
          rows={1}
        />
      </div>
      
      <div className="promptosaurus-card">
        <label className="promptosaurus-card-label">Constraints</label>
        <textarea 
          className="promptosaurus-textarea"
          value={constraints}
          onChange={(e) => setConstraints(e.target.value)}
          placeholder="Enter constraints..."
          rows={1}
        />
      </div>
      
      <button 
        className="promptosaurus-button"
        onClick={convertToPrompt}
        disabled={isProcessing}
      >
        {isProcessing ? 'Processing...' : 'Convert to prompt'}
      </button>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default PromptForm;