export type Race = Readonly<{
  id: string,
  name: string,
}>

export type CharacterClass = Readonly<{
  id: string,
  name: string,
}>

export type Level = Readonly<{
  id: string,
  level: number,
  minExperience: number,
  maxExperience: number,
}>

export type FetchedData = Readonly<{
  races: Race[],
  characterClasses: CharacterClass[],
  levels: Level[],
}>

export type CharacterValues = Readonly<{
  name: string,
  race: string,
  characterClass: string,
  experience: string,
}>

export type Option = Readonly<{
  id: string,
  name: string,
}>

export type Tabs = Readonly<{
  personal: JSX.Element,
  attributes: JSX.Element,
  characterClass: JSX.Element,
  spells: JSX.Element,
  items: JSX.Element,
}>

export type TabKind = keyof Tabs;
