export type CharacterValues = Readonly<{
  name: string;
  race: RaceName;
  characterClass: CharacterClassName;
  experience: string;
}>;

export type FetchedData = Readonly<{
  races: Race[];
  characterClasses: CharacterClass[];
  levels: Level[];
}>;

export type Race = Readonly<{
  name: RaceName;
}>;

export type RaceName =
  | "Dragonborn"
  | "Dwarf"
  | "Elf"
  | "Gnome"
  | "Halfling"
  | "Half-elf"
  | "Half-orc"
  | "Human"
  | "Tiefling";

export type CharacterClass = Readonly<{
  name: CharacterClassName;
}>;

export type CharacterClassName =
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
  | "Wizard";

export type Spell = Readonly<{
  name: string;
  level: number;
  characterClasses: {
    name: CharacterClassName;
  };
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

export type MagicSchool =
  | "abjuration"
  | "conjuration"
  | "divination"
  | "enchantment"
  | "evocation"
  | "illusion"
  | "necromancy"
  | "transmutation";

export type Component = "material" | "somatic" | "verbal";

export type Level = Readonly<{
  number: number;
  minExperience: number;
  maxExperience: number;
}>;

export type Option = RaceName | CharacterClassName;

export type Tabs = Readonly<{
  personal: JSX.Element;
  attributes: JSX.Element;
  characterClass: JSX.Element;
  spells: JSX.Element;
  items: JSX.Element;
}>;

export type TabKind = keyof Tabs;
