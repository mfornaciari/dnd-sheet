import type { FetchedData } from './types';
import '@/style/App.css';
import { GET_DATA } from './queries/getData';
import { QueryWrapper } from '@/components/QueryWrapper';
import { Form } from '@/components/Form';

export default function App() {
  return <QueryWrapper query={GET_DATA}>{(data: FetchedData) => <Form data={data} />}</QueryWrapper>;
}
