import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import ptbr from '../locales/pt-BR.json';
import App from '@/App';

i18next.init({
  lng: 'ptbr',
  debug: false,
  resources: ptbr,
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
