import type { Spell, SpellLevel } from "@/types";

export function getSpellLevels(spells: Spell[]): SpellLevel[] {
  return [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
}

export function getSpellNamesByLevel(spells: Spell[], levels: SpellLevel[]): string[][] {
  return levels.map(level => getLevelSpellNames(level, spells));
}

export function handleListItemClick(spellName: string, spellList: Spell[], action: (spell: Spell) => void): void {
  const spell = spellList.find(spell => spell.name === spellName);
  if (spell !== undefined) action(spell);
}

// PRIVATE

function getLevelSpellNames(level: SpellLevel, spells: Spell[]): string[] {
  const currentLevelSpells = spells.filter(spell => spell.level === level);
  return currentLevelSpells.map(spell => spell.name);
}
