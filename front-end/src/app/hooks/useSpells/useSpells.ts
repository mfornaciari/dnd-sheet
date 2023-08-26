import type { MouseEvent } from "react";
import type { Spell } from "@/types";
import { useState } from "react";
import { getSpellLevels, getSpellNamesByLevel, handleListItemClick } from "./helpers/useSpellsHelpers";

type UseSpellsReturn = {
  allSpellNamesByLevel: string[][];
  allSpellsSectionNames: string[];
  handleAllSpellsListItemClick: (event: MouseEvent<HTMLLIElement>) => void;
  handleKnownSpellsListItemClick: (event: MouseEvent<HTMLLIElement>) => void;
  knownSpellNamesByLevel: string[][];
  knownSpellsSectionNames: string[];
  selectedSpell: Spell;
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

  // function addSpell(spell: Spell): void {
  //   setKnownSpells(prevKnownSpells => [spell, ...prevKnownSpells]);
  // }
  function removeSpell(spell: Spell): void {
    setKnownSpells(prevKnownSpells => prevKnownSpells.filter(prevSpell => prevSpell.name !== spell.name));
  }
  function handleAllSpellsListItemClick(event: MouseEvent<HTMLLIElement>): void {
    const spellName = event.currentTarget.textContent;
    const spell = spells.find(spell => spell.name === spellName);
    if (spell !== undefined) setSelectedSpell(prevSelectedSpell => spell);
  }
  // function handleAllSpellsListItemClick(event: MouseEvent<HTMLLIElement>): void {
  //   const spellName = event.currentTarget.textContent;
  //   const knownSpellNames = knownSpells.map(spell => spell.name);
  //   if (spellName !== null && !knownSpellNames.includes(spellName)) handleListItemClick(spellName, spells, addSpell);
  // }
  function handleKnownSpellsListItemClick(event: MouseEvent<HTMLLIElement>): void {
    const spellName = event.currentTarget.textContent;
    if (spellName !== null) handleListItemClick(spellName, knownSpells, removeSpell);
  }

  return {
    allSpellNamesByLevel,
    allSpellsSectionNames,
    handleAllSpellsListItemClick,
    handleKnownSpellsListItemClick,
    knownSpellNamesByLevel,
    knownSpellsSectionNames,
    selectedSpell,
  };
}
