import type { FetchedData } from '@/types';
import { useQuery } from '@apollo/client';
import { GET_DATA } from '@/queries/getData';
import { StatusMessage } from '@/components/StatusMessage';
import { PropsWithChildren } from 'react';

export function QueryWrapper() {
  const { loading, error, data } = useQuery<FetchedData>(GET_DATA);

  if (loading) return <StatusMessage message='loading' />;
  if (error || !data) return <StatusMessage message='error' />;
}
