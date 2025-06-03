import React, { useEffect, useState } from 'react';
import '../PromptosaurusUI.css';
import MainContentArea from './MainContentArea';

/**
 * Props for the PromptosaurusUI component
 */
interface PromptosaurusUIProps {
  // Add any props you might need in the future
}

/**
 * The main UI component for the Promptosaurus application
 * Implements a three-section layout with navigation sidebar, collapsible storage section, and main content area
 */
const PromptosaurusUI: React.FC<PromptosaurusUIProps> = () => {
  const [navSidebarCollapsed, setNavSidebarCollapsed] = useState(false);
  const [notesSectionCollapsed, setNotesSectionCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('notes');
  
  // Effect to make the UI fill the entire viewport
  useEffect(() => {
    const setFullHeight = () => {
      document.documentElement.style.height = '100%';
      document.body.style.height = '100%';
    };
    
    setFullHeight();
    window.addEventListener('resize', setFullHeight);
    
    return () => {
      window.removeEventListener('resize', setFullHeight);
    };
  }, []);

  // Toggle navigation sidebar collapsed state
  const toggleNavSidebar = () => {
    setNavSidebarCollapsed(!navSidebarCollapsed);
  };

  // Toggle notes section collapsed state
  const toggleNotesSection = () => {
    setNotesSectionCollapsed(!notesSectionCollapsed);
  };

  return (
    <div className={`notes-app-container ${navSidebarCollapsed ? 'nav-collapsed' : ''} ${notesSectionCollapsed ? 'notes-collapsed' : ''}`} data-testid="promptosaurus-ui">
      {/* Navigation Sidebar */}
      <div className="navigation-sidebar">
        <div className="sidebar-header">
          <button className="toggle-sidebar-btn" onClick={toggleNavSidebar}>
            {navSidebarCollapsed ? '→' : '←'}
          </button>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li className={activeSection === 'notes' ? 'active' : ''}>
              <button onClick={() => setActiveSection('notes')}>
                <span className="nav-icon">📝</span>
                <span className="nav-text">Notes</span>
              </button>
            </li>
            <li className={activeSection === 'trash' ? 'active' : ''}>
              <button onClick={() => setActiveSection('trash')}>
                <span className="nav-icon">🗑️</span>
                <span className="nav-text">Trash</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Notes List Section */}
      <div className="notes-list-section">
        <div className="notes-list-header">
          <h2>Notes</h2>
          <div className="notes-actions">
            <button className="action-button">✏️</button>
            <button className="action-button">🔍</button>
            <button className="toggle-notes-btn" onClick={toggleNotesSection}>
              {notesSectionCollapsed ? '→' : '←'}
            </button>
          </div>
        </div>
        <div className="notes-list">
          <div className="note-item active">
            <div className="note-title">🐼 Polar Bears</div>
            <div className="note-preview">The largest #bear in the world and the Arctic's top predator, polar bear...</div>
            <div className="note-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="note-date">Yesterday</div>
          </div>
          <div className="note-item">
            <div className="note-title">🌱 My green friends</div>
            <div className="note-preview">Plant tracker 🌱 Plant 🌿 Watered last Spider Plant 8th April Areca Pal...</div>
            <div className="note-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="note-date">Just now</div>
          </div>
          <div className="note-item">
            <div className="note-title">Coding 101 - Swift</div>
            <div className="note-preview">#code Swift is a programming language for iOS, macOS, and iPad...</div>
            <div className="note-date">July 10</div>
          </div>
          <div className="note-item">
            <div className="note-title">Homemade Pizza Recipe</div>
            <div className="note-preview">#Recipe Pizza Dough 1 1/2 cups (355 ml) warm water (105°F-115°F)...</div>
            <div className="note-image">
              <div className="image-placeholder"></div>
            </div>
            <div className="note-date">July 8</div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="main-content-section">
        {/* Using the new MainContentArea component based on Figma design */}
        <MainContentArea />
      </div>
    </div>
  );
};

export default PromptosaurusUI;