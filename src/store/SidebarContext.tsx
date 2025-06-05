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
      const shouldCollapse = window.innerWidth < 1024; // Threshold width in pixels
      setIsLeftSidebarCollapsed(shouldCollapse);
      setIsRightSidebarCollapsed(shouldCollapse);
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