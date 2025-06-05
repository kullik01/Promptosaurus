import React from 'react';
import '@/styles/App.css';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="header">
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      </div>
      
      <div className="content-container">
        <div className="left-sidebar">
          <div className="sidebar-header">
            <h2>Title of left sidebar</h2>
            <button className="close-button">×</button>
          </div>
        </div>
        
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
              <button className="format-button">XML</button>
              <button className="format-button">YAML</button>
              <button className="format-button">Markdown</button>
              <button className="format-button">JSON</button>
            </div>
          </div>
        </div>
        
        <div className="right-sidebar">
          <div className="sidebar-header">
            <h2>Title of right sidebar</h2>
            <button className="close-button">×</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;