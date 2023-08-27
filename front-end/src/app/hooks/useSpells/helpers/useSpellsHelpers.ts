import type { Spell, SpellLevel } from "@/types";

export function getSpellLevels(spells: Spell[]): SpellLevel[] {
  return [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
}

export function getSpellNamesByLevel(spells: Spell[], levels: SpellLevel[]): string[][] {
  return levels.map(level => getLevelSpellNames(level, spells));
}

// PRIVATE

function getLevelSpellNames(level: SpellLevel, spells: Spell[]): string[] {
  const currentLevelSpells = spells.filter(spell => spell.level === level);
  return currentLevelSpells.map(spell => spell.name);
}
