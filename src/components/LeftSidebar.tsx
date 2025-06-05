import React from 'react';
import '@/styles/Sidebar.css';

const LeftSidebar: React.FC = () => {
  // Categories based on Figma design
  const categories = [
    { id: 'role', name: 'Role', active: true },
    { id: 'task', name: 'Task', active: false },
    { id: 'context', name: 'Context', active: false },
    { id: 'constraints', name: 'Constraints', active: false },
  ];

  // Format options based on Figma design
  const formatOptions = [
    { id: 'xml', name: 'XML' },
    { id: 'yaml', name: 'YAML' },
    { id: 'markdown', name: 'Markdown' },
    { id: 'json', name: 'JSON' },
  ];

  return (
    <div className="sidebar left-sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Title of left sidebar</h2>
        <div className="sidebar-controls">
          <button className="sidebar-control-button" aria-label="Minimize">
            <span className="control-line"></span>
          </button>
          <button className="sidebar-control-button" aria-label="Close">
            <span className="control-line horizontal"></span>
            <span className="control-line vertical"></span>
          </button>
        </div>
      </div>

      <div className="sidebar-content">
        <div className="category-section">
          {categories.map((category) => (
            <div 
              key={category.id} 
              className={`category-card ${category.active ? 'active' : ''}`}
            >
              <span className="category-name">{category.name}</span>
            </div>
          ))}
        </div>

        <div className="format-section">
          <span className="format-label">Convert prompt to</span>
          <div className="format-options">
            {formatOptions.map((format) => (
              <div key={format.id} className="format-card">
                <span className="format-name">{format.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSidebar;