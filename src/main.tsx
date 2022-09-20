import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import i18next from 'i18next';
import ptbr from '../locales/pt-BR.json';

i18next.init({
  lng: 'ptbr',
  debug: false,
  resources: ptbr
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
