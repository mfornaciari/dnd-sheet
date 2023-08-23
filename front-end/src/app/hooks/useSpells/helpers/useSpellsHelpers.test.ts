import type { Spell } from "@/types";
import { getSpellLevels, getSpellNamesByLevel, handleListItemClick } from "./useSpellsHelpers";
import fetchedDataMock from "@/test/fetchedDataMock.json";

describe("getSpellLevels", () => {
  it("returns spell levels in ascending order", () => {
    const spells = fetchedDataMock.data.spells as Spell[];

    const levels = getSpellLevels(spells);

    expect(levels).toEqual([1, 2]);
  });
});

describe("getSpellNamesByLevel", () => {
  it("returns an array of arrays of spell names where each subarray includes only spells of the same level", () => {
    const spells = fetchedDataMock.data.spells as Spell[];
    const levels = getSpellLevels(spells);

    const spellNamesByLevel = getSpellNamesByLevel(spells, levels);

    expect(spellNamesByLevel).toEqual([["Alarm"], ["Acid Arrow"]]);
  });
});

describe("handleListItemClick", () => {
  it("calls a function on a spell if it's found in a list of spells", () => {
    const spellName = fetchedDataMock.data.spells[0].name;
    const spellList = fetchedDataMock.data.spells as Spell[];
    let result = null;
    function action(spell: Spell): void {
      result = spell.name;
    }

    handleListItemClick(spellName, spellList, action);

    expect(result).toEqual(spellName);
  });

  it("does not call a function on a spell if it's not found in a list of spells", () => {
    const spellName = "Test name";
    const spellList = fetchedDataMock.data.spells as Spell[];
    let result = null;
    function action(spell: Spell): void {
      result = spell.name;
    }

    handleListItemClick(spellName, spellList, action);

    expect(result).toBeNull();
  });
});
