import React from 'react';
import '@/styles/Sidebar.css';

const LeftSidebar: React.FC = () => {
  return (
    <div className="left-sidebar">
      <div className="sidebar-header">
        <h2>Title of left sidebar</h2>
        <button className="close-button">×</button>
      </div>
    </div>
  );
};

export default LeftSidebar;