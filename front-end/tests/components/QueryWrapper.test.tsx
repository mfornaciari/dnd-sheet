import type { FetchedData } from "@/types";
import { render, screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { GET_DATA } from "@/queries/getData";
import fetchedDataMock from "../fetchedDataMock.json";
import { QueryWrapper } from "@/components/QueryWrapper";

type TestChildProps = {
  data: FetchedData;
};

describe("QueryWrapper", () => {
  function TestChild({ data }: TestChildProps) {
    return <div role="alert">{data.races[0].name}</div>;
  }

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
      error: new Error("An error occurred"),
    },
  ];

  it("renders child with data prop after loading query results", async () => {
    render(
      <MockedProvider mocks={queryMocks} addTypename={false}>
        <QueryWrapper query={GET_DATA}>{(data: FetchedData) => <TestChild data={data} />}</QueryWrapper>
      </MockedProvider>
    );
    const raceNameRegex = new RegExp(`^${fetchedDataMock.data.races[0].name}$`);

    await waitForElementToBeRemoved(() => screen.getByRole("status", { name: "Carregando..." }));

    // Shows first race name gotten from data
    expect(screen.getByRole("alert")).toHaveTextContent(raceNameRegex);
  });

  it("renders error message when query returns an error", async () => {
    render(
      <MockedProvider mocks={errorQueryMocks} addTypename={false}>
        <QueryWrapper query={GET_DATA}>{(data: FetchedData) => <TestChild data={data} />}</QueryWrapper>
      </MockedProvider>
    );
    const statusMessage = screen.getByRole("status");

    await waitFor(() => expect(statusMessage).toHaveTextContent(/^Erro$/));
  });
});
