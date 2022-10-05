import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import i18next from 'i18next';
import ptbr from '../locales/pt-BR.json';
import '@/style/App.css';
import Form from '@/components/Form';

i18next.init({
  lng: 'ptbr',
  debug: false,
  resources: ptbr,
});

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Form />
    </ApolloProvider>
  );
}
