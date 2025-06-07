// Define interfaces for component props and state

// Navbar types
export interface NavItem {
  id: string;
  icon: string;
  label: string;
}

// Sidebar types
export interface Category {
  id: string;
  name: string;
  active: boolean;
}

export interface FormatOption {
  id: string;
  name: string;
}

// App state types
export interface AppState {
  leftSidebarVisible: boolean;
  rightSidebarVisible: boolean;
  activeCategory: string;
  selectedFormat: string | null;
}
