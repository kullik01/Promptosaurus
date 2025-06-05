import React from 'react';
import { useSidebar } from '@/store/SidebarContext';
import '@/styles/Navbar.css';

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
        title={isLeftSidebarVisible ? "Hide left sidebar" : "Show left sidebar"}
      >
        <div className="diagonal-line"></div>
      </button>
      <button 
        className={`nav-button ${isRightSidebarVisible ? 'active' : ''}`}
        onClick={toggleRightSidebar}
        title={isRightSidebarVisible ? "Hide right sidebar" : "Show right sidebar"}
      >
        <div className="diagonal-line-reverse"></div>
      </button>
      <button className="nav-button">
        <div className="horizontal-line"></div>
      </button>
      <button className="nav-button">
        <div className="vertical-line"></div>
      </button>
    </div>
  );
};

export default Navbar;