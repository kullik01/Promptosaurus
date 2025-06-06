import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/styles/global.css';
import { registerServiceWorker, isTauriApp } from '@/registerSW';

// Register service worker for PWA support only when not running in Tauri
if (!isTauriApp()) {
  registerServiceWorker();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);