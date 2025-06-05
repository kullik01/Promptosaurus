import React, { useState } from 'react';
import '@/styles/App.css';
import MainPanel from '@/components/MainPanel';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <div className="header">
        <div className="header-left">
          <div className="file-menu">
            <span className="menu-item">File</span>
            <span className="menu-item">View</span>
          </div>
        </div>
        <div className="header-right">
          <div className="search-box">
            <input type="text" placeholder="Search" className="search-input" />
          </div>
        </div>
      </div>
      
      <div className="content-container">
        <div className="left-sidebar">
          <div className="sidebar-icons">
            <div className="sidebar-icon">🔍</div>
            <div className="sidebar-icon">📁</div>
            <div className="sidebar-icon">🔄</div>
            <div className="sidebar-icon">🔗</div>
            <div className="sidebar-icon">📊</div>
          </div>
          <div className="search-panel">
            <div className="search-header">
              <span>Search</span>
            </div>
            <div className="search-controls">
              <div className="search-input-wrapper">
                <input type="text" placeholder="Search" className="search-input" />
                <div className="search-options">
                  <span className="case-sensitive">Aa</span>
                  <span className="regex">.*</span>
                  <span className="more-options">⋮</span>
                </div>
              </div>
              <div className="replace-input-wrapper">
                <input type="text" placeholder="Replace" className="replace-input" />
                <div className="replace-options">
                  <span className="all">All</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <MainPanel />
      </div>
      
      <div className="footer">
        <div className="footer-left">
          <span className="footer-item">in_clover</span>
        </div>
        <div className="footer-center">
          <span className="footer-item">0:1</span>
          <span className="footer-item">1</span>
          <span className="footer-item">0</span>
        </div>
      </div>
    </div>
  );
};

export default App;