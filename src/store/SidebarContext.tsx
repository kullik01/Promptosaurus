import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isLeftSidebarVisible: boolean;
  isRightSidebarVisible: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  showLeftSidebar: () => void;
  showRightSidebar: () => void;
  hideLeftSidebar: () => void;
  hideRightSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isLeftSidebarVisible: false,
  isRightSidebarVisible: false,
  toggleLeftSidebar: () => {},
  toggleRightSidebar: () => {},
  showLeftSidebar: () => {},
  showRightSidebar: () => {},
  hideLeftSidebar: () => {},
  hideRightSidebar: () => {},
});

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isLeftSidebarVisible, setIsLeftSidebarVisible] = useState(true);
  const [isRightSidebarVisible, setIsRightSidebarVisible] = useState(true);
  // Track if user has manually toggled sidebars
  const [leftSidebarUserToggled, setLeftSidebarUserToggled] = useState(false);
  const [rightSidebarUserToggled, setRightSidebarUserToggled] = useState(false);
  
  const toggleLeftSidebar = () => {
    setLeftSidebarUserToggled(true);
    setIsLeftSidebarVisible(!isLeftSidebarVisible);
  };
  
  const toggleRightSidebar = () => {
    setRightSidebarUserToggled(true);
    setIsRightSidebarVisible(!isRightSidebarVisible);
  };
  
  const showLeftSidebar = () => {
    setLeftSidebarUserToggled(true);
    setIsLeftSidebarVisible(true);
  };
  
  const showRightSidebar = () => {
    setRightSidebarUserToggled(true);
    setIsRightSidebarVisible(true);
  };
  
  const hideLeftSidebar = () => {
    setLeftSidebarUserToggled(true);
    setIsLeftSidebarVisible(false);
  };
  
  const hideRightSidebar = () => {
    setRightSidebarUserToggled(true);
    setIsRightSidebarVisible(false);
  };

  // Handle responsive behavior while respecting user toggled state
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      // Only apply default behavior if user hasn't toggled
      if (!leftSidebarUserToggled) {
        // Default behavior based on screen width
        setIsLeftSidebarVisible(width >= 1024);
      }
      
      if (!rightSidebarUserToggled) {
        // Default behavior based on screen width
        setIsRightSidebarVisible(width >= 1024);
      }
    };
    
    // Initial check
    handleResize();
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [leftSidebarUserToggled, rightSidebarUserToggled]);
  
  return (
    <SidebarContext.Provider
      value={{
        isLeftSidebarVisible,
        isRightSidebarVisible,
        toggleLeftSidebar,
        toggleRightSidebar,
        showLeftSidebar,
        showRightSidebar,
        hideLeftSidebar,
        hideRightSidebar
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);