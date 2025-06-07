import React, { useEffect, useState } from 'react';
import { useSidebar } from '../store/SidebarContext';
import { usePlatform } from '../services/platformContext';
import { Prompt } from "../../src-pwa/promptElements";
import PromptCard from './PromptCard';
import PromptDialog from './PromptDialog';
import '../styles/Sidebar.css';

interface LeftSidebarProps {
  onOpenPrompt: (data: Record<string, string>) => void;
  refreshTrigger: boolean;
  isMainPanelReady?: boolean;
}

const LeftSidebar: React.FC<LeftSidebarProps> = ({ 
  onOpenPrompt, 
  refreshTrigger, 
  isMainPanelReady = false 
}) => {
  const { isLeftSidebarVisible, hideLeftSidebar } = useSidebar();
  const platformService = usePlatform();
  // @ts-expect-error isMobileView is declared but its value is never read.
  const [isMobileView, setIsMobileView] = useState(false);
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Load saved prompts
  const loadPrompts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const savedPrompts = await platformService.getAllPrompts();
      setPrompts(savedPrompts);
    } catch (err) {
      console.error('Error loading prompts:', err);
      setError('Failed to load saved prompts');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLeftSidebarVisible) {
      loadPrompts();
    }
  }, [isLeftSidebarVisible, platformService, refreshTrigger]);
  
  // Check if we're in mobile view
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobileView();
    
    // Add event listener
    window.addEventListener('resize', checkMobileView);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);
  
  // Handle search input change
  const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    try {
      if (value.trim() === '') {
        // If search is empty, load all prompts
        const allPrompts = await platformService.getAllPrompts();
        setPrompts(allPrompts);
      } else {
        // Search for prompts matching the search term
        const searchResults = await platformService.searchPrompts(value);
        setPrompts(searchResults);
      }
    } catch (err) {
      console.error('Error searching prompts:', err);
      setError('Failed to search prompts');
    }
  };
  
  // Handle prompt card click
  const handlePromptClick = (prompt: Prompt) => {
    setSelectedPrompt(prompt);
  };
  
  // Handle dialog close
  const handleDialogClose = () => {
    setSelectedPrompt(null);
  };

  // Handle prompt deletion
  const handleDeletePrompt = async (promptId: string) => {
    try {
      await platformService.deletePrompt(promptId);
      // Remove the deleted prompt from the state
      setPrompts(prevPrompts => prevPrompts.filter(p => p.id !== promptId));
      // If the deleted prompt is currently selected, close the dialog
      if (selectedPrompt && selectedPrompt.id === promptId) {
        setSelectedPrompt(null);
      }
    } catch (err) {
      console.error('Error deleting prompt:', err);
      alert(`Failed to delete prompt: ${err}`);
    }
  };
  
  // If sidebar is not visible, don't render anything
  if (!isLeftSidebarVisible) {
    return null;
  }
  
  return (
    <div className="left-sidebar">
      <div className="sidebar-header">
        <h2>Prompt Library</h2>
        <button 
          className="close-button" 
          onClick={hideLeftSidebar}
          aria-label="Close left sidebar"
        >
          ×
        </button>
      </div>
      
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search prompts" 
          className="search-input" 
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="sidebar-content">
        {isLoading ? (
          <div className="prompt-loading">Loading prompts...</div>
        ) : error ? (
          <div className="prompt-error">{error}</div>
        ) : prompts.length === 0 ? (
          <div className="prompt-empty">
            {searchTerm ? 'No prompts match your search' : 'No saved prompts yet'}
          </div>
        ) : (
          <div className="prompt-list">
            {prompts.map((prompt) => (
              <PromptCard 
                key={prompt.id} 
                prompt={prompt} 
                onClick={handlePromptClick}
                onDelete={handleDeletePrompt}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Prompt Dialog */}
      <PromptDialog 
        prompt={selectedPrompt} 
        onClose={handleDialogClose} 
        onOpen={onOpenPrompt}
        isMainPanelReady={isMainPanelReady}
        onDelete={handleDeletePrompt}
      />
    </div>
  );
};

export default LeftSidebar;