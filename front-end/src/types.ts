export type CharacterDataType = Readonly<{
  name: string,
  race: number,
  characterClass: number,
  experience: number,
}>

export type FetchedDataType = Readonly<{
  races: RaceType[],
  characterClasses: CharacterClassType[],
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

export type OptionDataType = Readonly<{
  id: number,
  name: string,
}>

export type TabsType = Readonly<{
  personal: JSX.Element,
  attributes: JSX.Element,
  characterClass: JSX.Element,
  barbarian: JSX.Element,
  bard: JSX.Element,
  cleric: JSX.Element,
  druid: JSX.Element,
  fighter: JSX.Element,
  monk: JSX.Element,
  paladin: JSX.Element,
  ranger: JSX.Element,
  rogue: JSX.Element,
  sorcerer: JSX.Element,
  warlock: JSX.Element,
  wizard: JSX.Element,
  spells: JSX.Element,
  items: JSX.Element,
}>

export type TabNameType = Readonly<keyof TabsType>
