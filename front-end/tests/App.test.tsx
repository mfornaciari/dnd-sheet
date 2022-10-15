import { render, screen, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { GET_DATA } from '@/queries/getData';
import fetchedDataMock from './fetchedDataMock.json';
import App from '@/App';

describe('App', () => {
  const queryMocks = [
    {
      request: {
        query: GET_DATA,
      },
      result: fetchedDataMock,
    },
  ];
  const errorQueryMocks = [
    {
      request: {
        query: GET_DATA,
      },
      error: new Error('An error occurred'),
    },
  ];

  it('renders loading message', () => {
    render(
      <MockedProvider mocks={queryMocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    expect(screen.getByRole('status')).toHaveTextContent(/^Carregando...$/);
  });

  it('renders error message when query returns an error', async () => {
    render(
      <MockedProvider mocks={errorQueryMocks} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const statusMessage = screen.getByRole('status');

    await waitFor(() => expect(statusMessage).toHaveTextContent(/^Erro$/));
  });
});
