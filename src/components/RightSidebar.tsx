import React, { useEffect, useState } from 'react';
import { useSidebar } from '../store/SidebarContext';
import '@/styles/Sidebar.css';

const RightSidebar: React.FC = () => {
  const { isRightSidebarCollapsed, toggleRightSidebar } = useSidebar();
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
    <div className={`right-sidebar ${isRightSidebarCollapsed ? 'collapsed' : ''} ${isMobileView ? 'mobile-view' : ''}`}>
      <div className="sidebar-header">
        {!isRightSidebarCollapsed && <h2>Title of right sidebar</h2>}
        <button 
          className="close-button" 
          onClick={toggleRightSidebar}
          disabled={isMobileView} // Disable toggle button in mobile view
        >
          {isRightSidebarCollapsed ? '←' : '×'}
        </button>
      </div>
      
      {/* Only show toggle in non-mobile view */}
      {!isMobileView && (
        <div className="sidebar-toggle" onClick={toggleRightSidebar}>
          <div className={`sidebar-toggle-icon ${isRightSidebarCollapsed ? 'collapsed' : ''}`}></div>
        </div>
      )}
    </div>
  );
};

export default RightSidebar;