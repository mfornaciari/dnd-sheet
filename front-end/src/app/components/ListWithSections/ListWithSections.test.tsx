import { render, screen, within } from "@testing-library/react";
import { ListWithSections } from "./ListWithSections";

describe("ListWithSections", () => {
  it("renders correctly", () => {
    const sectionObjects = [
      {
        title: "Seção 1",
        elements: [<p key="test1">Teste 1</p>],
      },
      {
        title: "Seção 2",
        elements: [<p key="test2">Teste 2</p>],
      },
    ];

    render(<ListWithSections title="Título" sectionObjects={sectionObjects} />);
    const container: HTMLDivElement = screen.getByRole("presentation");
    const heading: HTMLHeadingElement = within(container).getByRole("heading", { level: 1 });
    const list: HTMLOListElement = within(container).getByRole("list", { name: "Título" });
    const listSection1: HTMLLIElement = within(list).getByRole("listitem", { name: "Seção 1" });
    const listSection2: HTMLLIElement = within(list).getByRole("listitem", { name: "Seção 2" });
    const sectionHeading1: HTMLHeadingElement = within(listSection1).getByRole("heading", { level: 2 });
    const sectionHeading2: HTMLHeadingElement = within(listSection2).getByRole("heading", { level: 2 });
    const sublist1: HTMLUListElement = within(listSection1).getByRole("list");
    const sublist2: HTMLUListElement = within(listSection2).getByRole("list");

    expect(heading).toHaveTextContent(/^Título$/);
    expect(list).toHaveAccessibleName("Título");
    expect(sectionHeading1).toHaveTextContent(/^Seção 1$/);
    expect(sectionHeading2).toHaveTextContent(/^Seção 2$/);
    expect(sublist1).toHaveTextContent("Teste 1");
    expect(sublist2).toHaveTextContent("Teste 2");
  });
});
