import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/style/style.css';
import '@/services/i18n.ts';
import App from '@/App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
