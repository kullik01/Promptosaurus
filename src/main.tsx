import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import PWABadge from './PWABadge';
import './styles/global.css';

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <>
      <App />
      <PWABadge />
    </>
  </React.StrictMode>,
);