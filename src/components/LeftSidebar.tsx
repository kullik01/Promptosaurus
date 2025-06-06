import React, { useEffect, useState } from 'react';
import { useSidebar } from '../store/SidebarContext';
import '../styles/Sidebar.css';

const LeftSidebar: React.FC = () => {
  const { isLeftSidebarVisible, hideLeftSidebar } = useSidebar();
  const [, setIsMobileView] = useState(false);
  
  // Check if we're in mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobileView();
    
    // Add event listener
    window.addEventListener('resize', checkMobileView);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);
  
  // If sidebar is not visible, don't render anything
  if (!isLeftSidebarVisible) {
    return null;
  }
  
  return (
    <div className="left-sidebar">
      <div className="sidebar-header">
        <h2>Prompt Library</h2>
        <button 
          className="close-button" 
          onClick={hideLeftSidebar}
          aria-label="Close left sidebar"
        >
          ×
        </button>
      </div>
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
      </div>
    </div>
  );
};

export default LeftSidebar;