import React from 'react';
import { usePromptStore } from '../store/promptStore';
import './MainContentArea.css';

interface MainContentAreaProps {
  // Add any props if needed
}

/**
 * MainContentArea component that implements the UI design from Figma
 * Contains input fields for Role, Task, Context, and Constraints
 * Also includes format conversion options
 */
const MainContentArea: React.FC<MainContentAreaProps> = () => {
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
  } = usePromptStore();

  return (
    <div className="main-content-area">
      {showPopup && (
        <div className="popup-message">
          Prompt copied to clipboard!
        </div>
      )}

      {/* Role input */}
      <div className="input-group">
        <div className="input-label">Role</div>
        <div className="input-field">
          <textarea
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Enter the role..."
            rows={2}
          />
        </div>
      </div>

      {/* Task input */}
      <div className="input-group">
        <div className="input-label">Task</div>
        <div className="input-field">
          <textarea
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter the task..."
            rows={2}
          />
        </div>
      </div>

      {/* Context input */}
      <div className="input-group">
        <div className="input-label">Context</div>
        <div className="input-field">
          <textarea
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Enter the context..."
            rows={2}
          />
        </div>
      </div>

      {/* Constraints input */}
      <div className="input-group">
        <div className="input-label">Constraints</div>
        <div className="input-field">
          <textarea
            value={constraints}
            onChange={(e) => setConstraints(e.target.value)}
            placeholder="Enter the constraints..."
            rows={2}
          />
        </div>
      </div>

      {/* Format conversion options */}
      <div className="format-conversion">
        <div className="conversion-label">Convert prompt to</div>
        <div className="format-options">
          <button className="format-option">XML</button>
          <button className="format-option">YAML</button>
          <button className="format-option">Markdown</button>
          <button className="format-option">JSON</button>
        </div>
      </div>

      {/* Convert button */}
      <div className="action-buttons">
        <button 
          className="convert-button"
          onClick={convertToPrompt}
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Convert to prompt'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default MainContentArea;