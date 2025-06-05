import React from 'react';
import '@/styles/Sidebar.css';

const RightSidebar: React.FC = () => {
  return (
    <div className="right-sidebar">
      <div className="sidebar-header">
        <h2>Title of right sidebar</h2>
        <button className="close-button">×</button>
      </div>
    </div>
  );
};

export default RightSidebar;