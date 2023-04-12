import type { Spell } from "@/types";
import "./PanelSpells.css";
import { Panel, ListWithSections } from "@/app/components";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  const spellLevels = [...new Set(spells.map(spell => spell.level))].sort((item, otherItem) => item - otherItem);
  const spellNamesByLevel = spellLevels.map(level =>
    spells.filter(spell => spell.level === level).map(spell => spell.name)
  );
  const sectionNames = spellLevels.map(level => `Nível ${level}`);

  return (
    <Panel className="panel-spells" tabButtonId="spells">
      <ListWithSections title="Magias disponíveis" sectionNames={sectionNames} data={spellNamesByLevel} />
      <div>Test</div>
      <div>Test2</div>
    </Panel>
  );
}
