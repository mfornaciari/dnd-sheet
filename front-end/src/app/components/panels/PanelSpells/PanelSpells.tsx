import type { MouseEvent } from "react";
import type { Spell, SpellLevel } from "@/types";
import "./PanelSpells.css";
import { useState } from "react";
import { ListItemClickable, ListWithSections, Panel } from "@/app/components";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  const [knownSpells, setKnownSpells] = useState<Spell[]>([]);
  const allSpellsLevels = getSpellLevels(spells);
  const knownSpellsLevels = getSpellLevels(knownSpells);
  const allSpellsSectionNames = allSpellsLevels.map(level => `Nível ${level}`);
  const knownSpellsSectionNames = knownSpellsLevels.map(level => `Nível ${level}`);
  const allSpellNamesByLevel = getSpellNamesByLevel(spells, allSpellsLevels);
  const knownSpellNamesByLevel = getSpellNamesByLevel(knownSpells, knownSpellsLevels);

  function addSpell(spell: Spell): void {
    setKnownSpells(prevKnownSpells => [spell, ...prevKnownSpells]);
  }
  function removeSpell(spell: Spell): void {
    setKnownSpells(prevKnownSpells => prevKnownSpells.filter(prevSpell => prevSpell.name !== spell.name));
  }
  function handleAllSpellsListItemClick(event: MouseEvent<HTMLLIElement>): void {
    handleListItemClick(event, spells, addSpell);
  }
  function handleKnownSpellsListItemClick(event: MouseEvent<HTMLLIElement>): void {
    handleListItemClick(event, knownSpells, removeSpell);
  }

  const allSpellsListItemsByLevel = buildSpellListItemsByLevel(allSpellNamesByLevel, handleAllSpellsListItemClick);
  const knownSpellsListItemsByLevel = buildSpellListItemsByLevel(
    knownSpellNamesByLevel,
    handleKnownSpellsListItemClick
  );

  return (
    <Panel className="panel-spells" tabButtonId="spells">
      <ListWithSections
        title="Magias disponíveis"
        sectionNames={allSpellsSectionNames}
        listItemsBySection={allSpellsListItemsByLevel}
      />

      <div className="spell-card">Test</div>

      <ListWithSections
        title="Magias conhecidas"
        sectionNames={knownSpellsSectionNames}
        listItemsBySection={knownSpellsListItemsByLevel}
      />
    </Panel>
  );
}

function getSpellLevels(spells: Spell[]): SpellLevel[] {
  return [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
}

function getSpellNamesByLevel(spells: Spell[], levels: SpellLevel[]): string[][] {
  const spellNamesByLevel = levels.map(level => {
    const currentLevelSpells = spells.filter(spell => spell.level === level);
    return currentLevelSpells.map(spell => spell.name);
  });
  return spellNamesByLevel;
}

function handleListItemClick(
  event: MouseEvent<HTMLLIElement>,
  spellList: Spell[],
  action: (spell: Spell) => void
): void {
  const spellName = event.currentTarget.textContent;
  if (spellName !== null) {
    const spell = spellList.find(spell => spell.name === spellName);
    if (spell !== undefined) action(spell);
  }
}

function buildSpellListItemsByLevel(
  spellNamesByLevel: string[][],
  handleClick: (event: MouseEvent<HTMLLIElement>) => void
): JSX.Element[][] {
  const spellListItemsByLevel = spellNamesByLevel.map(group =>
    group.map(spellName => (
      <li key={spellName}>
        <ListItemClickable handleClick={handleClick}>{spellName}</ListItemClickable>
      </li>
    ))
  );
  return spellListItemsByLevel;
}
