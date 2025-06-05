import React from 'react';
import '@/styles/MainPanel.css';

const MainPanel: React.FC = () => {
  return (
    <div className="main-panel">
      <div className="prompt-form-container">
        <div className="form-field">
          <label htmlFor="role-input">Role</label>
          <input 
            type="text" 
            id="role-input" 
            className="form-input" 
            aria-label="Role"
          />
        </div>

        <div className="form-field">
          <label htmlFor="task-input">Task</label>
          <input 
            type="text" 
            id="task-input" 
            className="form-input" 
            aria-label="Task"
          />
        </div>

        <div className="form-field">
          <label htmlFor="context-input">Context</label>
          <input 
            type="text" 
            id="context-input" 
            className="form-input" 
            aria-label="Context"
          />
        </div>

        <div className="form-field">
          <label htmlFor="constraints-input">Constraints</label>
          <input 
            type="text" 
            id="constraints-input" 
            className="form-input" 
            aria-label="Constraints"
          />
        </div>

        <div className="format-conversion">
          <p className="conversion-label">Convert prompt to</p>
          <div className="format-buttons">
            <button className="format-button">XML</button>
            <button className="format-button">YAML</button>
            <button className="format-button">Markdown</button>
            <button className="format-button">JSON</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPanel;