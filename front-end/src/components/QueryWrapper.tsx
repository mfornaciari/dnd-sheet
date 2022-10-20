import type { FetchedData } from "@/types";
import type { DocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client";
import { StatusMessage } from "@/components/StatusMessage";

type QueryWrapperProps = {
  query: DocumentNode;
  // TODO: Make wrapper support multiple children
  children: (data: FetchedData) => JSX.Element;
};

export function QueryWrapper({ query, children }: QueryWrapperProps) {
  const { loading, error, data } = useQuery<FetchedData>(query);

  if (loading) return <StatusMessage message="loading" />;
  if (error || !data) return <StatusMessage message="error" />;

  return children(data);
}
