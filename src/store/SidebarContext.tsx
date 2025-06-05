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
  
  const toggleLeftSidebar = () => {
    setIsLeftSidebarVisible(!isLeftSidebarVisible);
  };
  
  const toggleRightSidebar = () => {
    setIsRightSidebarVisible(!isRightSidebarVisible);
  };
  
  const showLeftSidebar = () => {
    setIsLeftSidebarVisible(true);
  };
  
  const showRightSidebar = () => {
    setIsRightSidebarVisible(true);
  };
  
  const hideLeftSidebar = () => {
    setIsLeftSidebarVisible(false);
  };
  
  const hideRightSidebar = () => {
    setIsRightSidebarVisible(false);
  };

  // Automatically hide sidebars when viewport width is below threshold
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      const shouldHide = width < 1024; // Threshold width for hiding sidebars
      
      // Always hide sidebars at mobile sizes (below 768px)
      if (width < 768) {
        setIsLeftSidebarVisible(false);
        setIsRightSidebarVisible(false);
      } else if (shouldHide) {
        // For medium screens, hide by default but allow toggling
        setIsLeftSidebarVisible(false);
        setIsRightSidebarVisible(false);
      } else {
        // For large screens, show by default
        setIsLeftSidebarVisible(true);
        setIsRightSidebarVisible(true);
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
  }, []);
  
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