import type { MouseEvent } from "react";
import type { Spell } from "@/types";
import "./PanelSpells.css";
import { useSpells } from "@/app/hooks";
import { ListItemClickable, ListWithSections, Panel } from "@/app/components";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  const {
    allSpellsSectionNames,
    knownSpellsSectionNames,
    allSpellNamesByLevel,
    knownSpellNamesByLevel,
    handleAllSpellsListItemClick,
    handleKnownSpellsListItemClick,
  } = useSpells(spells);

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

// PRIVATE

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
