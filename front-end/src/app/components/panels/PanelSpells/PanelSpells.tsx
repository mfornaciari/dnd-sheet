import type { Spell } from "@/types";
import { Panel, Table } from "@/app/components";
import { SpellRow } from "./SpellRow/SpellRow";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  const headerTitles = ["Nome", "Escola", "Tempo de conjuração", "Componentes", "Duração", "Ritual"];
  const spellRows = spells.map(spell => <SpellRow spell={spell} key={spell.name} />);

  return (
    <Panel tabButtonId="spells">
      <Table caption="Magias" headerTitles={headerTitles}>
        {spellRows}
      </Table>
    </Panel>
  );
}
