/**
 * Platform Context
 * 
 * This context provides access to the appropriate platform service implementation
 * based on the current runtime environment (Tauri desktop or web/PWA).
 */
import React, { createContext, useContext, ReactNode } from 'react';
import { PlatformService } from './platformService';
import { TauriPlatformService } from './tauriPlatformService';
import { WebPlatformService } from './webPlatformService';

/**
 * Determines if the application is running in a Tauri environment
 */
const isTauriEnvironment = (): boolean => {
  // Check if window.__TAURI__ exists, which is injected by Tauri
  return typeof window !== 'undefined' && !!(window as any).__TAURI__;
};

/**
 * Create the appropriate platform service based on the current environment
 */
const createPlatformService = (): PlatformService => {
  if (isTauriEnvironment()) {
    return new TauriPlatformService();
  } else {
    return new WebPlatformService();
  }
};

// Create the platform service instance
const platformService = createPlatformService();

// Create the context with the platform service
const PlatformContext = createContext<PlatformService>(platformService);

interface PlatformProviderProps {
  children: ReactNode;
}

/**
 * Platform Provider component that makes the platform service available
 * to all child components via the context API
 */
export const PlatformProvider: React.FC<PlatformProviderProps> = ({ children }) => {
  return (
    <PlatformContext.Provider value={platformService}>
      {children}
    </PlatformContext.Provider>
  );
};

/**
 * Custom hook to use the platform service
 * @returns The platform service instance
 */
export const usePlatform = (): PlatformService => useContext(PlatformContext);