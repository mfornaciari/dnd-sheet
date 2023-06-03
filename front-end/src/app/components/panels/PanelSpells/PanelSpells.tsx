import type { Spell } from "@/types";
import "./PanelSpells.css";
import { Panel, ListWithSections } from "@/app/components";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  const spellLevels = [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
  const spellListItemsByLevel = spellLevels.map(level => {
    const currentLevelSpells = spells.filter(spell => spell.level === level);
    return currentLevelSpells.map(spell => <li key={spell.name}>{spell.name}</li>);
  });
  const sectionNames = spellLevels.map(level => `Nível ${level}`);

  return (
    <Panel className="panel-spells" tabButtonId="spells">
      <ListWithSections
        title="Magias disponíveis"
        sectionNames={sectionNames}
        listItemsBySection={spellListItemsByLevel}
      />

      <div className="spell-card">Test</div>

      <ListWithSections
        title="Magias conhecidas"
        sectionNames={sectionNames}
        listItemsBySection={spellListItemsByLevel}
      />
    </Panel>
  );
}
