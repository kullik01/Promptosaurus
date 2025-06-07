import React, { useState } from 'react';
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
  
  // Callback to receive the loadPromptData function from MainPanel
  const handleLoadPromptDataReady = (loadFn: (data: Record<string, string>) => void) => {
    setLoadPromptData(loadFn);
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
            <LeftSidebar onOpenPrompt={loadPromptData || ((data) => {
              console.warn('Attempted to open prompt before MainPanel was ready');
              // Could add a global notification system here in the future
              alert('Cannot open prompt at this time. Please try again.');
            })} />
            <MainPanel onLoadPromptDataReady={handleLoadPromptDataReady} />
            <RightSidebar/>
          </div>
        </div>
      </SidebarProvider>
    </PlatformProvider>
  );
};

export default App;