import { useQuery } from '@apollo/client';
import { GET_DATA } from './queries/getData';
import { FetchedData } from './types';
import '@/style/App.css';
import { Form } from '@/components/Form';
import { StatusMessage } from './components/StatusMessage';

export default function App() {
  const { loading, error, data } = useQuery<FetchedData>(GET_DATA);

  if (loading) return <StatusMessage message='loading' />;
  if (error || !data) return <StatusMessage message='error' />;

  return (
    <Form data={data} />
  );
}
