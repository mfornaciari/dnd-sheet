import type { Spell } from "@/types";
import { render, screen, within } from "@testing-library/react";
import fetchedDataMock from "@/test/fetchedDataMock.json";
import { ListWithSections } from "./ListWithSections";

describe("ListWithSections", () => {
  it("renders correctly", () => {
    const spells = fetchedDataMock.data.spells as Spell[];
    const spellLevels = [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
    const spellNamesByLevel = spellLevels.map(level => {
      const currentLevelSpells = spells.filter(spell => spell.level === level);
      return currentLevelSpells.map(spell => spell.name);
    });
    const spellListItemsByLevel = spellNamesByLevel.map(group => group.map(name => <li key={name}>{name}</li>));
    const sectionNames = spellLevels.map(level => `Nível ${level}`);

    render(
      <ListWithSections
        title="Magias disponíveis"
        sectionNames={sectionNames}
        listItemsBySection={spellListItemsByLevel}
      />
    );
    const container: HTMLDivElement = screen.getByRole("presentation");
    const heading: HTMLHeadingElement = within(container).getByRole("heading", { level: 1 });
    const list: HTMLOListElement = within(container).getByRole("list", { name: "Magias disponíveis" });
    const listSections: HTMLLIElement[] = within(list).getAllByRole("listitem", { name: /^Nível \d{1}$/ });

    expect(heading).toHaveTextContent(/^Magias disponíveis$/);
    expect(list).toHaveAccessibleName("Magias disponíveis");
    let sectionIndex = 0;
    for (const sectionName of sectionNames) {
      const currentSection = listSections[sectionIndex];
      expect(currentSection).toHaveAccessibleName(sectionName);
      const sectionHeading: HTMLHeadingElement = within(currentSection).getByRole("heading", { level: 2 });
      expect(sectionHeading).toHaveTextContent(new RegExp(`^${sectionName}$`));
      const sublist: HTMLUListElement = within(currentSection).getByRole("list");
      const spellElements: HTMLLIElement[] = within(sublist).getAllByRole("listitem");
      let spellIndex = 0;
      for (const element of spellElements) {
        const spellName = spellNamesByLevel[sectionIndex][spellIndex];
        expect(element).toHaveTextContent(new RegExp(`^${spellName}$`));
        spellIndex += 1;
      }
      sectionIndex += 1;
    }
  });
});
