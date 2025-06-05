import React, { useEffect, useState } from 'react';
import { useSidebar } from '../store/SidebarContext';
import '@/styles/Sidebar.css';

const LeftSidebar: React.FC = () => {
  const { isLeftSidebarCollapsed, toggleLeftSidebar } = useSidebar();
  const [isMobileView, setIsMobileView] = useState(false);
  
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
  
  return (
    <div className={`left-sidebar ${isLeftSidebarCollapsed ? 'collapsed' : ''} ${isMobileView ? 'mobile-view' : ''}`}>
      <div className="sidebar-header">
        {!isLeftSidebarCollapsed && <h2>Title of left sidebar</h2>}
        <button 
          className="close-button" 
          onClick={toggleLeftSidebar}
          disabled={isMobileView} // Disable toggle button in mobile view
        >
          {isLeftSidebarCollapsed ? '→' : '×'}
        </button>
      </div>
      {!isLeftSidebarCollapsed && (
        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
        </div>
      )}
      
      {/* Only show toggle in non-mobile view */}
      {!isMobileView && (
        <div className="sidebar-toggle" onClick={toggleLeftSidebar}>
          <div className={`sidebar-toggle-icon ${isLeftSidebarCollapsed ? 'collapsed' : ''}`}></div>
        </div>
      )}
    </div>
  );
};

export default LeftSidebar;