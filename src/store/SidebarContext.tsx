import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface SidebarContextType {
  isLeftSidebarCollapsed: boolean;
  isRightSidebarCollapsed: boolean;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
  isLeftSidebarCollapsed: false,
  isRightSidebarCollapsed: false,
  toggleLeftSidebar: () => {},
  toggleRightSidebar: () => {},
});

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = useState(false);
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  
  const toggleLeftSidebar = () => {
    setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed);
  };
  
  const toggleRightSidebar = () => {
    setIsRightSidebarCollapsed(!isRightSidebarCollapsed);
  };

  // Automatically collapse sidebars when viewport width is below threshold
  useEffect(() => {
    const handleResize = () => {
      // Different thresholds for different behaviors
      const width = window.innerWidth;
      const shouldCollapse = width < 1024; // Threshold width for normal collapse
      
      // Always collapse sidebars at mobile sizes (below 768px)
      // This ensures they stay in the correct position
      if (width < 768) {
        setIsLeftSidebarCollapsed(true);
        setIsRightSidebarCollapsed(true);
      } else {
        // Normal responsive behavior for larger screens
        setIsLeftSidebarCollapsed(shouldCollapse);
        setIsRightSidebarCollapsed(shouldCollapse);
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
        isLeftSidebarCollapsed,
        isRightSidebarCollapsed,
        toggleLeftSidebar,
        toggleRightSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);