import type { MouseEvent } from "react";
import type { Spell, SpellLevel } from "@/types";

export function getSpellLevels(spells: Spell[]): SpellLevel[] {
  return [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
}

export function getSpellNamesByLevel(spells: Spell[], levels: SpellLevel[]): string[][] {
  const spellNamesByLevel = levels.map(level => {
    const currentLevelSpells = spells.filter(spell => spell.level === level);
    return currentLevelSpells.map(spell => spell.name);
  });
  return spellNamesByLevel;
}

export function handleListItemClick(
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
