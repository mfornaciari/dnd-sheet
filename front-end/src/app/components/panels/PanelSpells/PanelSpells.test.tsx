import type { Spell } from "@/types";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { PanelSpells } from "./PanelSpells";
import fetchedDataMock from "@/test/fetchedDataMock.json";

describe("PanelSpells", () => {
  it("renders correctly", async () => {
    const spells = fetchedDataMock.data.spells as Spell[];

    render(<PanelSpells spells={spells} />);

    const acidArrowButton: HTMLButtonElement = screen.getByRole("button", { name: "Acid Arrow" });
    await user.click(acidArrowButton);

    const knownSpellsList: HTMLOListElement = screen.getByRole("list", { name: "Magias conhecidas" });
    expect(knownSpellsList).toHaveTextContent("Acid Arrow");

    const allSpellsList: HTMLOListElement = screen.getByRole("list", { name: "Magias disponíveis" });
    const availableAcidArrowButton: HTMLButtonElement = within(allSpellsList).getByRole("button", {
      name: "Acid Arrow",
    });
    await user.click(availableAcidArrowButton);

    const knownSpellButtons: HTMLButtonElement[] = within(knownSpellsList).getAllByRole("button");
    expect(knownSpellButtons.length).toEqual(1);

    const knownAcidArrowButton: HTMLButtonElement = within(knownSpellsList).getByRole("button", {
      name: "Acid Arrow",
    });
    await user.click(knownAcidArrowButton);

    expect(knownSpellsList).not.toHaveTextContent("Acid Arrow");
  });
});
