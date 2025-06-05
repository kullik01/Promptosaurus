import React from 'react';
import { useSidebar } from '../store/SidebarContext';
import '@/styles/Sidebar.css';

const RightSidebar: React.FC = () => {
  const { isRightSidebarCollapsed, toggleRightSidebar } = useSidebar();
  
  return (
    <div className={`right-sidebar ${isRightSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        {!isRightSidebarCollapsed && <h2>Title of right sidebar</h2>}
        <button className="close-button" onClick={toggleRightSidebar}>
          {isRightSidebarCollapsed ? '←' : '×'}
        </button>
      </div>
      
      <div className="sidebar-toggle" onClick={toggleRightSidebar}>
        <div className={`sidebar-toggle-icon ${isRightSidebarCollapsed ? 'collapsed' : ''}`}></div>
      </div>
    </div>
  );
};

export default RightSidebar;