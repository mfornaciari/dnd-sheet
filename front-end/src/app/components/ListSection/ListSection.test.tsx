import { render, screen, within } from "@testing-library/react";
import { ListSection } from "./ListSection";

describe("ListSection", () => {
  it("renders correctly", () => {
    const elements = [
      <button type="button" key="test1">
        Teste 1
      </button>,
      <button type="button" key="test2">
        Teste 2
      </button>,
    ];

    render(<ListSection title="Título" elements={elements} />);
    const mainListItem: HTMLLIElement = screen.getByRole("listitem", { name: "Título" });
    const heading: HTMLHeadingElement = within(mainListItem).getByRole("heading", { level: 2 });
    const sublist: HTMLUListElement = within(mainListItem).getByRole("list");
    const sublistItems: HTMLLIElement[] = within(sublist).getAllByRole("listitem");
    const button1: HTMLButtonElement = within(sublistItems[0]).getByRole("button");
    const button2: HTMLButtonElement = within(sublistItems[1]).getByRole("button");

    expect(heading).toHaveTextContent(/^Título$/);
    expect(button1).toHaveTextContent(/^Teste 1$/);
    expect(button2).toHaveTextContent(/^Teste 2$/);
  });
});
