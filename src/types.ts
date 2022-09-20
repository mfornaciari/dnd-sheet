export type LevelInfo = Readonly<{
  id: number,
  level: number,
  minExperience: number,
  maxExperience: number
}>

export type CharacterDataType = Readonly<{
  name: string,
  class: number,
  race: number,
  experience: number,
}>
