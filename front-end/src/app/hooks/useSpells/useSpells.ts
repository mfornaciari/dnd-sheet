import type { MouseEvent } from "react";
import type { Spell, SpellLevel } from "@/types";
import { useState } from "react";

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

function getSpellLevels(spells: Spell[]): SpellLevel[] {
  return [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
}

function getSpellNamesByLevel(spells: Spell[], levels: SpellLevel[]): string[][] {
  const spellNamesByLevel = levels.map(level => {
    const currentLevelSpells = spells.filter(spell => spell.level === level);
    return currentLevelSpells.map(spell => spell.name);
  });
  return spellNamesByLevel;
}

function handleListItemClick(
  event: MouseEvent<HTMLLIElement>,
  spellList: Spell[],
  action: (spell: Spell) => void
): void {
  const spellName = event.currentTarget.textContent;
  if (spellName !== null) {
    const spell = spellList.find(spell => spell.name === spellName);
    if (spell !== undefined) action(spell);
  }
}
