/**
 * Platform Utilities
 * 
 * Utility functions for platform detection and platform-specific operations.
 */

/**
 * Checks if the application is running in a Tauri desktop environment
 * @returns true if running in Tauri, false otherwise
 */
export const isTauriEnvironment = (): boolean => {
  // Check if window.__TAURI__ exists, which is injected by Tauri
  return typeof window !== 'undefined' && !!(window as any).__TAURI__;
};

/**
 * Checks if the application is running as a Progressive Web App
 * @returns true if running as a PWA, false otherwise
 */
export const isPwaEnvironment = (): boolean => {
  // Check if the app is running in standalone mode or as an installed PWA
  return (
    typeof window !== 'undefined' &&
    (window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true)
  );
};

/**
 * Checks if the application is running in a web browser (not as a PWA)
 * @returns true if running in a regular browser, false otherwise
 */
export const isBrowserEnvironment = (): boolean => {
  return typeof window !== 'undefined' && !isTauriEnvironment() && !isPwaEnvironment();
};

/**
 * Gets the current platform name
 * @returns A string representing the current platform: 'tauri', 'pwa', or 'browser'
 */
export const getPlatformName = (): 'tauri' | 'pwa' | 'browser' => {
  if (isTauriEnvironment()) return 'tauri';
  if (isPwaEnvironment()) return 'pwa';
  return 'browser';
};