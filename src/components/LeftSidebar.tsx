import React from 'react';
import { useSidebar } from '../store/SidebarContext';
import '@/styles/Sidebar.css';

const LeftSidebar: React.FC = () => {
  const { isLeftSidebarCollapsed, toggleLeftSidebar } = useSidebar();
  
  return (
    <div className={`left-sidebar ${isLeftSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isLeftSidebarCollapsed && <h2>Title of left sidebar</h2>}
        <button className="close-button" onClick={toggleLeftSidebar}>
          {isLeftSidebarCollapsed ? '→' : '×'}
        </button>
      </div>
      {!isLeftSidebarCollapsed && (
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      )}
      
      <div className="sidebar-toggle" onClick={toggleLeftSidebar}>
        <div className={`sidebar-toggle-icon ${isLeftSidebarCollapsed ? 'collapsed' : ''}`}></div>
      </div>
    </div>
  );
};

export default LeftSidebar;