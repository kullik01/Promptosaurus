import React, { useEffect, useState } from 'react';
import { useSidebar } from '../store/SidebarContext';
import '@/styles/Sidebar.css';

const RightSidebar: React.FC = () => {
  const { isRightSidebarVisible, hideRightSidebar } = useSidebar();
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
  
  // If sidebar is not visible, don't render anything
  if (!isRightSidebarVisible) {
    return null;
  }
  
  return (
    <div className="right-sidebar">
      <div className="sidebar-header">
        <h2>Prompt Optimization</h2>
        <button 
          className="close-button" 
          onClick={hideRightSidebar}
          aria-label="Close right sidebar"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default RightSidebar;