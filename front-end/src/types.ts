export type CharacterValues = Readonly<{
  name: string;
  race: RaceName;
  characterClass: CharacterClassName;
  experience: string;
}>;

export type FetchedData = Readonly<{
  races: Race[];
  characterClasses: CharacterClass[];
  spells: Spell[];
  levels: Level[];
}>;

export type Race = Readonly<{
  name: RaceName;
}>;

export type RaceName = Readonly<
  "Dragonborn" | "Dwarf" | "Elf" | "Gnome" | "Halfling" | "Half-elf" | "Half-orc" | "Human" | "Tiefling"
>;

export type CharacterClass = Readonly<{
  name: CharacterClassName;
}>;

export type CharacterClassName = Readonly<
  | "Barbarian"
  | "Bard"
  | "Cleric"
  | "Druid"
  | "Fighter"
  | "Monk"
  | "Paladin"
  | "Ranger"
  | "Rogue"
  | "Sorcerer"
  | "Warlock"
  | "Wizard"
>;

export type Spell = Readonly<{
  __typename: "Spell";
  name: string;
  level: SpellLevel;
  characterClasses: {
    name: CharacterClassName;
  }[];
  school: MagicSchool;
  castingTime: string;
  range: string;
  components: Component[];
  materialComponents: string | null;
  duration: string;
  description: string;
  atHigherLevels: string | null;
  ritual: boolean;
  inSrd: boolean;
}>;

export type SpellLevel = Readonly<0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9>;

export type MagicSchool = Readonly<
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "evocation"
  | "illusion"
  | "necromancy"
  | "transmutation"
>;

export type Component = Readonly<"material" | "somatic" | "verbal">;

export type Level = Readonly<{
  number: number;
  minExperience: number;
  maxExperience: number;
}>;

export type LevelSpellNames = {
  level: number;
  spellNames: string[];
};

export type Option = Readonly<RaceName | CharacterClassName>;

export type SectionObject = {
  title: string;
  elements: JSX.Element[];
};

export type Tabs = Readonly<{
  personal: JSX.Element;
  attributes: JSX.Element;
  characterClass: JSX.Element;
  spells: JSX.Element;
  items: JSX.Element;
}>;

export type TabKind = Readonly<keyof Tabs>;
