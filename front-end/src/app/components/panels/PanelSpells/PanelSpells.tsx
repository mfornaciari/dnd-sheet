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

  function handleListItemClick(event: MouseEvent<HTMLLIElement>): void {
    const spellName = event.currentTarget.textContent;
    if (spellName !== null) {
      const spell = spells.find(spell => spell.name === spellName);
      if (spell !== undefined) {
        setKnownSpells(prevKnownSpells => [spell, ...prevKnownSpells]);
      }
    }
  }
  function buildSpellListItemsByLevel(spellNamesByLevel: string[][]): JSX.Element[][] {
    const spellListItemsByLevel = spellNamesByLevel.map(group =>
      group.map(spellName => (
        <li key={spellName}>
          <ListItemClickable handleClick={handleListItemClick}>{spellName}</ListItemClickable>
        </li>
      ))
    );
    return spellListItemsByLevel;
  }

  const allSpellNamesByLevel = getSpellNamesByLevel(spells, allSpellsLevels);
  const knownSpellNamesByLevel = getSpellNamesByLevel(knownSpells, knownSpellsLevels);
  const allSpellsListItemsByLevel = buildSpellListItemsByLevel(allSpellNamesByLevel);
  const knownSpellsListItemsByLevel = buildSpellListItemsByLevel(knownSpellNamesByLevel);

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

function getSpellNamesByLevel(spells: Spell[], levels: SpellLevel[]): string[][] {
  const spellNamesByLevel = levels.map(level => {
    const currentLevelSpells = spells.filter(spell => spell.level === level);
    return currentLevelSpells.map(spell => spell.name);
  });
  return spellNamesByLevel;
}

function getSpellLevels(spells: Spell[]): SpellLevel[] {
  return [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
}
