import React from 'react';
import '@/styles/Navbar.css';

const Navbar: React.FC = () => {
  // Navigation items based on Figma design
  const navItems = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'role', icon: '👤', label: 'Role' },
    { id: 'task', icon: '📋', label: 'Task' },
    { id: 'context', icon: '🔍', label: 'Context' },
    { id: 'constraints', icon: '⚙️', label: 'Constraints' },
  ];

  return (
    <nav className="navbar">
      <div className="logo-container">
        <span className="logo">P</span>
      </div>
      <ul className="nav-items">
        {navItems.map((item) => (
          <li key={item.id} className="nav-item">
            <button className="nav-button" aria-label={item.label} title={item.label}>
              <span className="nav-icon">{item.icon}</span>
            </button>
          </li>
        ))}
      </ul>
      <div className="nav-footer">
        <button className="nav-button" aria-label="Settings" title="Settings">
          <span className="nav-icon">⚙️</span>
        </button>
        <button className="nav-button" aria-label="Help" title="Help">
          <span className="nav-icon">❓</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;