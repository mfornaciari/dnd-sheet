import type { CharacterClass, CharacterClassName, CharacterValues, Level } from "@/types";

export function calculateLevel(levels: Level[], experience: number) {
  if (!experience || experience < 0) return 1 // XP under 0

  const foundLevelInfo = levels.find(level => level.minExperience <= experience && level.maxExperience >= experience);
  if (!foundLevelInfo) return 20; // XP over 999.999

  return foundLevelInfo.level;
}

export function findClassName(characterClasses: CharacterClass[], selectedClassId: string) {
  const foundClass = characterClasses.find(characterClass => characterClass.id === selectedClassId);
  if (foundClass) return foundClass.name as CharacterClassName;

  return 'characterClass';
}

export function generateURL(formValues: CharacterValues) {
  const blob = new Blob([JSON.stringify(formValues)], { type: 'application/json' });
  return URL.createObjectURL(blob);
}
