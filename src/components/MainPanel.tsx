import React from 'react';
import '@/styles/MainPanel.css';

const MainPanel: React.FC = () => {
  return (
    <div className="main-panel">
          <div className="form-field">
            <label>Role</label>
            <input type="text" className="form-input" />
          </div>
          
          <div className="form-field">
            <label>Task</label>
            <input type="text" className="form-input" />
          </div>
          
          <div className="form-field">
            <label>Context</label>
            <input type="text" className="form-input" />
          </div>
          
          <div className="form-field">
            <label>Constraints</label>
            <input type="text" className="form-input" />
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