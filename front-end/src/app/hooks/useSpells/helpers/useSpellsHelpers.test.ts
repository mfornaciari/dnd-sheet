import type { Spell } from "@/types";
import { getSpellLevels, getSpellNamesByLevel } from "./useSpellsHelpers";
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
