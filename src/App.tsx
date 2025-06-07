import React, { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import LeftSidebar from './components/LeftSidebar';
import MainPanel from './components/MainPanel';
import RightSidebar from './components/RightSidebar';
import { SidebarProvider } from './store/SidebarContext';
import { PlatformProvider } from './services/platformContext';
import './styles/App.css';

/**
 * Main application component
 */
const App: React.FC = () => {
  // State to store the loadPromptData function from MainPanel
  const [loadPromptData, setLoadPromptData] = useState<((data: Record<string, string>) => void) | null>(null);
  const [refreshSidebar, setRefreshSidebar] = useState(false);
  // State to track if MainPanel is ready
  const [isMainPanelReady, setIsMainPanelReady] = useState(false);

  // Add debugging logs
  useEffect(() => {
    console.log('App component mounted');
    return () => {
      console.log('App component unmounted');
    };
  }, []);

  // Track loadPromptData changes
  useEffect(() => {
    console.log('loadPromptData state changed:', loadPromptData ? 'defined' : 'null');
  }, [loadPromptData]);

  // Callback to receive the loadPromptData function from MainPanel
  const handleLoadPromptDataReady = useCallback((loadFn: (data: Record<string, string>) => void) => {
    console.log('handleLoadPromptDataReady called, setting loadPromptData and isMainPanelReady');
    setLoadPromptData(() => {
      console.log('Setting loadPromptData to:', loadFn);
      return loadFn;
    });
    setIsMainPanelReady(true);
  }, []); // Empty dependency array to ensure stability

  // Callback to trigger sidebar refresh
  const handlePromptSaved = () => {
    setRefreshSidebar(prev => !prev);
  };

  // Safe wrapper for opening prompts
  const handleOpenPrompt = (data: Record<string, string>) => {
    console.log('handleOpenPrompt called with data:', data);
    console.log('isMainPanelReady:', isMainPanelReady);
    console.log('loadPromptData is', loadPromptData ? 'defined' : 'null');
    
    if (loadPromptData) {
      console.log('Calling loadPromptData with data');
      loadPromptData(data);
    } else {
      console.warn('Attempted to open prompt before MainPanel was ready');
      alert('Cannot open prompt at this time. Please try again in a moment.');
    }
  };
  
  return (
    <PlatformProvider>
      <SidebarProvider>
        <div className="app-container">
          {/* <div className="header">
            <div className="search-container">
              <input type="text" placeholder="Search" className="search-input" />
            </div>
          </div> */}
          
          <div className="content-container">
            <Navbar/>
            <LeftSidebar
              onOpenPrompt={handleOpenPrompt}
              refreshTrigger={refreshSidebar}
              isMainPanelReady={isMainPanelReady}
            />
            <MainPanel
              onLoadPromptDataReady={handleLoadPromptDataReady}
              onPromptSaved={handlePromptSaved}
            />
            <RightSidebar/>
          </div>
        </div>
      </SidebarProvider>
    </PlatformProvider>
  );
};

export default App;