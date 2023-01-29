import type { Spell } from "@/types";
import { render, screen, within } from "@testing-library/react";
import fetchedDataMock from "@/test/fetchedDataMock.json";
import { SpellRow } from "./SpellRow";

describe("SpellRow", () => {
  it("renders correctly when spell isn't ritual", () => {
    const spell = fetchedDataMock.data.spells[0] as Spell;
    render(
      <table>
        <tbody>
          <SpellRow spell={spell} />
        </tbody>
      </table>
    );
    const row: HTMLTableRowElement = screen.getByRole("row");
    const nameCell: HTMLTableCellElement = within(row).getByRole("rowheader");
    const schoolCell: HTMLTableCellElement = within(row).getByRole("cell", { name: spell.school });
    const castingTimeCell: HTMLTableCellElement = within(row).getByRole("cell", { name: spell.castingTime });
    const componentsCell: HTMLTableCellElement = within(row).getByRole("cell", { name: spell.components.join(", ") });
    const durationCell: HTMLTableCellElement = within(row).getByRole("cell", { name: spell.duration });
    const ritualCell: HTMLTableCellElement = within(row).getByRole("cell", { name: "No" });

    expect(row).toHaveAccessibleName(spell.name);
    expect(nameCell).toHaveAccessibleName(spell.name);
    expect(nameCell).toHaveClass("spell-cell");
    expect(schoolCell).toHaveClass("spell-cell");
    expect(castingTimeCell).toHaveClass("spell-cell");
    expect(componentsCell).toHaveClass("spell-cell");
    expect(durationCell).toHaveClass("spell-cell");
    expect(ritualCell).toHaveClass("spell-cell");
  });

  it("renders correctly when spell is ritual", () => {
    const spell = fetchedDataMock.data.spells[1] as Spell;
    render(
      <table>
        <tbody>
          <SpellRow spell={spell} />
        </tbody>
      </table>
    );
    const ritualCell: HTMLTableCellElement = screen.getByRole("cell", { name: "Yes" });

    expect(ritualCell).toHaveClass("spell-cell");
  });
});
