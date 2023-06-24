import type { MouseEvent } from "react";
import type { Spell } from "@/types";
import { useState } from "react";
import { getSpellLevels, getSpellNamesByLevel, handleListItemClick } from "./helpers/useSpellsHelpers";

type UseSpellsReturn = {
  allSpellsSectionNames: string[];
  knownSpellsSectionNames: string[];
  allSpellNamesByLevel: string[][];
  knownSpellNamesByLevel: string[][];
  handleAllSpellsListItemClick: (event: MouseEvent<HTMLLIElement>) => void;
  handleKnownSpellsListItemClick: (event: MouseEvent<HTMLLIElement>) => void;
};

export function useSpells(spells: Spell[]): UseSpellsReturn {
  const [knownSpells, setKnownSpells] = useState<Spell[]>([]);
  const allSpellsLevels = getSpellLevels(spells);
  const knownSpellsLevels = getSpellLevels(knownSpells);
  const allSpellsSectionNames = allSpellsLevels.map(level => `Nível ${level}`);
  const knownSpellsSectionNames = knownSpellsLevels.map(level => `Nível ${level}`);
  const allSpellNamesByLevel = getSpellNamesByLevel(spells, allSpellsLevels);
  const knownSpellNamesByLevel = getSpellNamesByLevel(knownSpells, knownSpellsLevels);

  function addSpell(spell: Spell): void {
    setKnownSpells(prevKnownSpells => [spell, ...prevKnownSpells]);
  }
  function removeSpell(spell: Spell): void {
    setKnownSpells(prevKnownSpells => prevKnownSpells.filter(prevSpell => prevSpell.name !== spell.name));
  }
  function handleAllSpellsListItemClick(event: MouseEvent<HTMLLIElement>): void {
    handleListItemClick(event, spells, addSpell);
  }
  function handleKnownSpellsListItemClick(event: MouseEvent<HTMLLIElement>): void {
    handleListItemClick(event, knownSpells, removeSpell);
  }

  return {
    allSpellsSectionNames,
    knownSpellsSectionNames,
    allSpellNamesByLevel,
    knownSpellNamesByLevel,
    handleAllSpellsListItemClick,
    handleKnownSpellsListItemClick,
  };
}
