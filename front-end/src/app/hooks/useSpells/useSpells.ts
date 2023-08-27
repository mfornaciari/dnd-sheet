import type { MouseEvent } from "react";
import type { Spell } from "@/types";
import { useState } from "react";
import { getSpellLevels, getSpellNamesByLevel } from "./helpers/useSpellsHelpers";

type UseSpellsReturn = {
  addSelectedSpell: () => void;
  allSpellNamesByLevel: string[][];
  allSpellsSectionNames: string[];
  handleSpellsListItemClick: (event: MouseEvent<HTMLLIElement>) => void;
  knownSpellNamesByLevel: string[][];
  knownSpellsSectionNames: string[];
  removeSelectedSpell: () => void;
  selectedSpell: Spell;
  selectedSpellIsKnown: boolean;
};

export function useSpells(spells: Spell[]): UseSpellsReturn {
  const [knownSpells, setKnownSpells] = useState<Spell[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<Spell>(spells[0]);
  const allSpellsLevels = getSpellLevels(spells);
  const knownSpellsLevels = getSpellLevels(knownSpells);
  const allSpellsSectionNames = allSpellsLevels.map(level => `Nível ${level}`);
  const knownSpellsSectionNames = knownSpellsLevels.map(level => `Nível ${level}`);
  const allSpellNamesByLevel = getSpellNamesByLevel(spells, allSpellsLevels);
  const knownSpellNamesByLevel = getSpellNamesByLevel(knownSpells, knownSpellsLevels);

  const selectedSpellIsKnown = knownSpells.includes(selectedSpell);

  function addSelectedSpell(): void {
    setKnownSpells(prevKnownSpells => [selectedSpell, ...prevKnownSpells]);
  }
  function removeSelectedSpell(): void {
    setKnownSpells(prevKnownSpells => prevKnownSpells.filter(prevSpell => prevSpell.name !== selectedSpell.name));
  }
  function handleSpellsListItemClick(event: MouseEvent<HTMLLIElement>): void {
    const spellName = event.currentTarget.textContent;
    const spell = spells.find(spell => spell.name === spellName);
    if (spell !== undefined) setSelectedSpell(prevSelectedSpell => spell);
  }

  return {
    addSelectedSpell,
    allSpellNamesByLevel,
    allSpellsSectionNames,
    handleSpellsListItemClick,
    knownSpellNamesByLevel,
    knownSpellsSectionNames,
    removeSelectedSpell,
    selectedSpell,
    selectedSpellIsKnown,
  };
}
