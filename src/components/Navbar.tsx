import React from 'react';
import { useSidebar } from '../store/SidebarContext';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const { 
    isLeftSidebarVisible, 
    isRightSidebarVisible, 
    toggleLeftSidebar, 
    toggleRightSidebar 
  } = useSidebar();

  return (
    <div className="nav-buttons">
      <button 
        className={`nav-button ${isLeftSidebarVisible ? 'active' : ''}`}
        onClick={toggleLeftSidebar}
        title={isLeftSidebarVisible ? "Hide Prompt Library" : "Show Prompt Library"}
      >
        <span className="material-symbols-outlined">library_books</span>
      </button>
      <button 
        className={`nav-button ${isRightSidebarVisible ? 'active' : ''}`}
        onClick={toggleRightSidebar}
        title={isRightSidebarVisible ? "Hide Prompt Optimization" : "Show Prompt Optimization"}
      >
        <span className="material-symbols-outlined">preview</span>
      </button>
    </div>
  );
};

export default Navbar;