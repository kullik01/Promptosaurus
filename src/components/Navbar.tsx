import React from 'react';
import '@/styles/Navbar.css';

const Navbar: React.FC = () => {
  return (
    <div className="nav-buttons">
      <button className="nav-button">
        <div className="diagonal-line"></div>
      </button>
      <button className="nav-button">
        <div className="diagonal-line-reverse"></div>
      </button>
      <button className="nav-button">
        <div className="horizontal-line"></div>
      </button>
      <button className="nav-button">
        <div className="vertical-line"></div>
      </button>
    </div>
  );
};

export default Navbar;