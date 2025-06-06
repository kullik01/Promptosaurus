// Service Worker Registration

// Define the Tauri window interface
interface TauriWindow extends Window {
  __TAURI__?: unknown;
}

export function registerServiceWorker() {
  // Only register service worker in production and if the browser supports it
  if ('serviceWorker' in navigator && import.meta.env.PROD) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then(registration => {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(error => {
          console.error('ServiceWorker registration failed: ', error);
        });
    });
  }
}

// Function to check if the app is running in Tauri environment
export function isTauriApp(): boolean {
  return typeof (window as TauriWindow).__TAURI__ !== 'undefined';
}