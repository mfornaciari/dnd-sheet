import type { Spell } from "@/types";
import { render, screen, within } from "@testing-library/react";
import fetchedDataMock from "@/test/fetchedDataMock.json";
import { ListWithSections } from "./ListWithSections";

describe("ListWithSections", () => {
  it("renders correctly", () => {
    const spells = fetchedDataMock.data.spells as Spell[];
    const levels = [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
    const spellNamesByLevel = levels.map(level =>
      spells.filter(spell => spell.level === level).map(spell => spell.name)
    );
    const sectionNames = levels.map(level => `Nível ${level}`);
    render(<ListWithSections title="Magias disponíveis" sectionNames={sectionNames} data={spellNamesByLevel} />);
    const heading: HTMLHeadingElement = screen.getByRole("heading", { level: 1 });
    const list: HTMLOListElement = screen.getByRole("list", { name: "Magias disponíveis" });
    const listSections: HTMLLIElement[] = within(list).getAllByRole("listitem", { name: /^Nível \d{1}$/ });

    expect(heading).toHaveTextContent(/^Magias disponíveis$/);
    let sectionIndex = 0;
    for (const sectionName of sectionNames) {
      const currentSection = listSections[sectionIndex];
      expect(currentSection).toHaveTextContent(sectionName);
      expect(currentSection).toHaveAccessibleName(sectionName);
      const sublist: HTMLUListElement = within(currentSection).getByRole("list");
      const spellElements: HTMLLIElement[] = within(sublist).getAllByRole("listitem");
      let spellIndex = 0;
      for (const element of spellElements) {
        expect(element).toHaveTextContent(new RegExp(`^${spellNamesByLevel[sectionIndex][spellIndex]}$`));
        spellIndex += 1;
      }
      sectionIndex += 1;
    }
  });
});
