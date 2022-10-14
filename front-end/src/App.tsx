import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import '@/style/App.css';
import Form from '@/components/Form';

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
