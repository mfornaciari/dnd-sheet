import React from 'react';
import ReactDOM from 'react-dom/client';
import i18next from 'i18next';
import ptbr from '../locales/pt-BR.json';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { App } from '@/app/App';

i18next.init({
  lng: 'ptbr',
  debug: false,
  resources: ptbr,
});

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
