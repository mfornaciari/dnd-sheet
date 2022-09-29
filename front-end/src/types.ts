export type FetchedDataType = Readonly<{
  races: RaceType[],
  characterClasses: CharacterClassType[],
  levels: LevelType[],
}>

export type CharacterClassType = Readonly<{
  id: string,
  name: string,
}>

export type RaceType = Readonly<{
  id: string,
  name: string,
}>

export type LevelType = Readonly<{
  id: string,
  level: number,
  minExperience: number,
  maxExperience: number,
}>

export type OptionDataType = Readonly<{
  id: string,
  name: string,
}>

export type TabsType = Readonly<{
  personal: JSX.Element,
  attributes: JSX.Element,
  characterClass: JSX.Element,
  spells: JSX.Element,
  items: JSX.Element,
}>

export type TabKindType = Readonly<keyof TabsType>
