import type { DocumentNode } from "graphql";
import type { FetchedData } from "@/types";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import fetchedDataMock from '@/test/fetchedDataMock.json';
import { GET_DATA } from "@/app/queries";
import { App } from "./App";

type MockGetDataArguments = {
  successful: boolean;
}

type MockedQueryReturn = {
  request: {
    query: DocumentNode;
  };
  result?: {
    data: FetchedData;
  };
  error?: Error;
};

function mockGetData({ successful }: MockGetDataArguments) {
  const result = {
    data: fetchedDataMock.data as FetchedData,
  };

  const error = new Error('An error occurred');

  const baseObject = {
    request: {
      query: GET_DATA,
    },
  };

  const returnedObject: MockedQueryReturn = successful
    ? Object.assign(baseObject, { result: result })
    : Object.assign(baseObject, { error: error });

  const mock = [returnedObject];

  return mock;
}

describe("App", () => {
  it("renders correctly when query is successful", async () => {
    render(
      <MockedProvider mocks={mockGetData({ successful: true })} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const loadingMessage = screen.getByRole("status", { name: "Carregando..." });

    // Renders loading message while awaiting query results
    expect(loadingMessage).toHaveTextContent(/^Carregando...$/);

    // Renders form after loading
    await waitForElementToBeRemoved(loadingMessage);

    expect(screen.getByRole("form")).toHaveAccessibleName("Formulário");
  });

  it("shows error message when query fails", async () => {
    render(
      <MockedProvider mocks={mockGetData({ successful: false })} addTypename={false}>
        <App />
      </MockedProvider>
    );
    const statusMessage = screen.getByRole("status", { name: "Carregando..." });

    await waitFor(() => { expect(statusMessage).toHaveTextContent(/^Erro$/) });
  });
});
