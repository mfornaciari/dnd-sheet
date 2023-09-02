import type { MouseEvent } from "react";
import type { LevelSpellNames, Spell } from "@/types";
import { useState } from "react";

type UseSpellsReturn = {
  addSelectedSpell: () => void;
  allSpellNamesByLevel: LevelSpellNames[];
  handleSpellsListItemClick: (event: MouseEvent<HTMLButtonElement>) => void;
  knownSpellNamesByLevel: LevelSpellNames[];
  removeSelectedSpell: () => void;
  selectedSpell: Spell;
  selectedSpellIsKnown: boolean;
};

export function useSpells(spells: Spell[]): UseSpellsReturn {
  const [knownSpells, setKnownSpells] = useState<Spell[]>([]);
  const [selectedSpell, setSelectedSpell] = useState<Spell>(spells[0]);
  const allSpellNamesByLevel = getSpellNamesByLevel(spells);
  const knownSpellNamesByLevel = getSpellNamesByLevel(knownSpells);
  const selectedSpellIsKnown = knownSpells.includes(selectedSpell);

  function addSelectedSpell(): void {
    setKnownSpells(prevKnownSpells => [selectedSpell, ...prevKnownSpells]);
  }
  function removeSelectedSpell(): void {
    setKnownSpells(prevKnownSpells => prevKnownSpells.filter(prevSpell => prevSpell.name !== selectedSpell.name));
  }
  function handleSpellsListItemClick(event: MouseEvent<HTMLButtonElement>): void {
    const spellName = event.currentTarget.textContent;
    const spell = spells.find(spell => spell.name === spellName);
    if (spell !== undefined) setSelectedSpell(prevSelectedSpell => spell);
  }

  return {
    addSelectedSpell,
    allSpellNamesByLevel,
    handleSpellsListItemClick,
    knownSpellNamesByLevel,
    removeSelectedSpell,
    selectedSpell,
    selectedSpellIsKnown,
  };
}

// PRIVATE

function getSpellNamesByLevel(spells: Spell[]): LevelSpellNames[] {
  return spells.reduce(spellReducer, []).sort((object, otherObject) => (object.level > otherObject.level ? 1 : -1));
}

function spellReducer(result: LevelSpellNames[], currentSpell: Spell): LevelSpellNames[] {
  const currentLevel = currentSpell.level;
  let objectInResult = result.find(object => object.level === currentLevel);
  if (objectInResult === undefined) {
    const newObject = { level: currentLevel, spellNames: [] };
    result.push(newObject);
    objectInResult = newObject;
  }
  objectInResult.spellNames.push(currentSpell.name);
  return result;
}
