export type CharacterDataType = Readonly<{
  name: string,
  class: number,
  race: number,
  experience: number,
}>

export type FetchedDataType = Readonly<{
  characterClasses: CharacterClassType[],
  races: RaceType[],
  levels: LevelType[],
}>

export type CharacterClassType = Readonly<{
  id: number,
  name: string,
}>

export type RaceType = Readonly<{
  id: number,
  name: string,
}>

export type LevelType = Readonly<{
  id: number,
  level: number,
  minExperience: number,
  maxExperience: number,
}>
