import React from 'react';
import Navbar from './components/Navbar';
import LeftSidebar from './components/LeftSidebar';
import MainPanel from './components/MainPanel';
import RightSidebar from './components/RightSidebar';
import { SidebarProvider } from './store/SidebarContext';
import './styles/App.css';

const App: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="app-container">
        {/* <div className="header">
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div> */}
        
        <div className="content-container">
          <Navbar/>
          <LeftSidebar/>
          <MainPanel/>
          <RightSidebar/>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default App;