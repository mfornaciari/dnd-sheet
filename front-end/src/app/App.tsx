import type { FetchedData } from "@/types";
import "./App.css";
import { useQuery } from "@apollo/client";
import { GET_DATA } from "@/app/queries";
import { Form, StatusMessage } from "@/app/components";


export function App() {
  const { loading, error, data } = useQuery<FetchedData>(GET_DATA);

  if (loading) return <StatusMessage message="loading" />;
  if (error || !data) return <StatusMessage message="error" />;

  return <Form data={data} />;
}
