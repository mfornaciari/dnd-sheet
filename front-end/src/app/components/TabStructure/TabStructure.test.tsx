import type { FetchedData } from "@/types";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import fetchedDataMock from "@/test/fetchedDataMock.json";
import { TabStructure } from "./TabStructure";

describe("TabStructure", () => {
  const data = fetchedDataMock.data as FetchedData;

  it("renders correctly and allows changing active tab", async () => {
    render(<TabStructure data={data} selectedClassName="Barbarian" />);
    let activePanel: HTMLDivElement = screen.getByRole("tabpanel");
    const tabList: HTMLDivElement = screen.getByRole("tablist", { name: "Abas" });
    const tabPersonal: HTMLButtonElement = within(tabList).getByRole("tab", { name: "Pessoal" });
    const tabAttributes: HTMLButtonElement = within(tabList).getByRole("tab", { name: "Atributos" });
    const tabCharacterClass: HTMLButtonElement = within(tabList).getByRole("tab", { name: "Bárbaro" });
    const tabSpells: HTMLButtonElement = within(tabList).getByRole("tab", { name: "Magias" });
    const tabItems: HTMLButtonElement = within(tabList).getByRole("tab", { name: "Itens" });

    expect(tabList).toHaveAccessibleName("Abas");
    expect(tabList).toHaveClass("tab-list");
    // Personal tab is open by default
    expect(activePanel).toHaveAccessibleName("Pessoal");
    expect(tabPersonal).toHaveAttribute("aria-selected", "true");
    expect(tabAttributes).toHaveAttribute("aria-selected", "false");
    expect(tabCharacterClass).toHaveAttribute("aria-selected", "false");
    expect(tabSpells).toHaveAttribute("aria-selected", "false");
    expect(tabItems).toHaveAttribute("aria-selected", "false");

    // Allows user to change active tab
    await user.click(tabAttributes);
    activePanel = screen.getByRole("tabpanel");

    expect(activePanel).toHaveAccessibleName("Atributos");
    expect(tabAttributes).toHaveAttribute("aria-selected", "true");
    expect(tabPersonal).toHaveAttribute("aria-selected", "false");

    await user.click(tabCharacterClass);
    activePanel = screen.getByRole("tabpanel");

    expect(activePanel).toHaveAccessibleName("Bárbaro");
    expect(tabCharacterClass).toHaveAttribute("aria-selected", "true");
    expect(tabAttributes).toHaveAttribute("aria-selected", "false");

    await user.click(tabSpells);
    activePanel = screen.getByRole("tabpanel");

    expect(activePanel).toHaveAccessibleName("Magias");
    expect(tabSpells).toHaveAttribute("aria-selected", "true");
    expect(tabCharacterClass).toHaveAttribute("aria-selected", "false");

    await user.click(tabItems);
    activePanel = screen.getByRole("tabpanel");

    expect(activePanel).toHaveAccessibleName("Itens");
    expect(tabItems).toHaveAttribute("aria-selected", "true");
    expect(tabSpells).toHaveAttribute("aria-selected", "false");
  });
});
