import type { Spell } from "@/types";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { PanelSpells } from "./PanelSpells";
import fetchedDataMock from "@/test/fetchedDataMock.json";

describe("PanelSpells", () => {
  it("renders correctly", async () => {
    const spells = fetchedDataMock.data.spells as Spell[];

    render(<PanelSpells spells={spells} />);

    // Shows spell card upon clicking on a spell in the list with all spells
    const allSpellsList: HTMLOListElement = screen.getByRole("list", { name: "Magias disponíveis" });
    let acidArrowButton: HTMLButtonElement = within(allSpellsList).getByRole("button", { name: "Acid Arrow" });
    await user.click(acidArrowButton);
    const spellCard: HTMLDivElement = screen.getByRole("region", { name: "Acid Arrow" });
    const spellCardHeading: HTMLHeadingElement = within(spellCard).getByRole("heading", { level: 1 });
    const spellCardTerms = within(spellCard).getAllByRole("term");
    const spellCardDefinitions = within(spellCard).getAllByRole("definition");

    expect(spellCardHeading).toHaveTextContent(/^Acid Arrow$/);
    expect(spellCardTerms[0]).toHaveTextContent(/^Escola:$/);
    expect(spellCardDefinitions[0]).toHaveTextContent(/^evocation$/);
    expect(spellCardTerms[1]).toHaveTextContent(/^Nível:$/);
    expect(spellCardDefinitions[1]).toHaveTextContent(/^2$/);
    expect(spellCardTerms[2]).toHaveTextContent(/^Classes:$/);
    expect(spellCardDefinitions[2]).toHaveTextContent(/^Wizard$/);
    expect(spellCardTerms[3]).toHaveTextContent(/^Tempo de conjuração:$/);
    expect(spellCardDefinitions[3]).toHaveTextContent(/^1 action$/);
    expect(spellCardTerms[4]).toHaveTextContent(/^Alcance:$/);
    expect(spellCardDefinitions[4]).toHaveTextContent(/^90 feet$/);
    expect(spellCardTerms[5]).toHaveTextContent(/^Duração:$/);
    expect(spellCardDefinitions[5]).toHaveTextContent(/^Instantaneous$/);
    expect(spellCardTerms[6]).toHaveTextContent(/^Componentes:$/);
    expect(spellCardDefinitions[6]).toHaveTextContent(/^Material, somatic, verbal$/);
    expect(spellCardTerms[7]).toHaveTextContent(/^Componentes materiais:$/);
    expect(spellCardDefinitions[7]).toHaveTextContent(/^Powdered rhubarb leaf and an adder's stomach\.$/);
    expect(spellCardTerms[8]).toHaveTextContent(/^Descrição:$/);
    expect(spellCardDefinitions[8]).toHaveTextContent(
      /^A shimmering green arrow streaks toward a target within range and bursts in a spray of acid. Make a ranged spell attack against the target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid damage at the end of its next turn. On a miss, the arrow splashes the target with acid for half as much of the initial damage and no damage at the end of its next turn\.$/
    );
    expect(spellCardTerms[9]).toHaveTextContent(/^Em níveis superiores:$/);
    expect(spellCardDefinitions[9]).toHaveTextContent(
      /^When you cast this spell using a spell slot of 3rd level or higher, the damage \(both initial and later\) increases by 1d4 for each slot level above 2nd\.$/
    );
    expect(spellCardTerms[10]).toHaveTextContent(/^Ritual:$/);
    expect(spellCardDefinitions[10]).toHaveTextContent(/^Não$/);

    // Has button to add spell to list of known spells
    let addSpellButton: HTMLButtonElement = within(spellCard).getByRole("button");

    expect(addSpellButton).toHaveTextContent(/^Adicionar às conhecidas$/);
    expect(addSpellButton).toHaveAccessibleName("Adicionar às conhecidas");

    // Adds spell to list of known spells upon clicking the button
    await user.click(addSpellButton);

    const knownSpellsList: HTMLOListElement = screen.getByRole("list", { name: "Magias conhecidas" });
    expect(knownSpellsList).toHaveTextContent("Acid Arrow");

    // Shows spell card upon clicking on a spell in the list with all spells
    const alarmButton = within(allSpellsList).getByRole("button", { name: "Alarm" });
    await user.click(alarmButton);
    addSpellButton = within(spellCard).getByRole("button");
    await user.click(addSpellButton);
    acidArrowButton = within(knownSpellsList).getByRole("button", { name: "Acid Arrow" });
    await user.click(acidArrowButton);

    expect(spellCard).toHaveTextContent("Acid Arrow");

    // Has button to remove known spell from list of known spells
    const removeSpellButton: HTMLButtonElement = within(spellCard).getByRole("button");

    expect(removeSpellButton).toHaveTextContent(/^Remover das conhecidas$/);
    expect(removeSpellButton).toHaveAccessibleName("Remover das conhecidas");

    // Removes spell from list of known spells upon clicking the button
    await user.click(removeSpellButton);

    expect(knownSpellsList).not.toHaveTextContent("Acid Arrow");
  });
});
