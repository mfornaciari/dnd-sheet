import type { Spell } from "@/types";
import { Panel, Table } from "@/app/components";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  const headerTitles = ["Nome", "Escola", "Tempo de conjuração", "Componentes", "Duração", "Ritual"];
  const spellsTableData = spells.map(spell => {
    const {
      __typename, // eslint-disable-line
      characterClasses,
      level,
      range,
      materialComponents,
      description,
      atHigherLevels,
      inSrd,
      ...spellTableData
    } = spell;
    return spellTableData;
  });

  return (
    <Panel tabButtonId="spells">
      <Table caption="Magias" headerTitles={headerTitles} data={spellsTableData} />
    </Panel>
  );
}
