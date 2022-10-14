import { CharacterClass, CharacterValues, Level } from "@/types";

export function generateURL(formValues: CharacterValues) {
  const blob = new Blob([JSON.stringify(formValues)], { type: 'application/json' });
  return URL.createObjectURL(blob);
}

export function calculateLevel(levels: Level[], currentXp: string): number {
  const numberXp = Number(currentXp);
  const foundLevelInfo = levels.find(level => level.minExperience <= numberXp && level.maxExperience >= numberXp);
  if (!foundLevelInfo) return 20; // XP over 999.999

  return foundLevelInfo.level;
}

export function findClassName(characterClasses: CharacterClass[], selectedClassId: string): string {
  const foundClass = characterClasses.find(characterClass => characterClass.id === selectedClassId);
  if (foundClass) return foundClass.name;

  return 'characterClass';
}
