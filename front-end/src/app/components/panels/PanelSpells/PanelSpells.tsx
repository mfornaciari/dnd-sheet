import type { Spell } from "@/types";
import { Panel } from "@/app/components";
import { SpellRow } from "./SpellRow/SpellRow";

type PanelSpellsProps = {
  spells: Spell[];
};

export function PanelSpells({ spells }: PanelSpellsProps): JSX.Element {
  return (
    <Panel tabButtonId="spells">
      <table>
        <caption>Magias</caption>

        <thead>
          <tr aria-label="headers">
            <th scope="col">Nome</th>
            <th scope="col">Escola</th>
            <th scope="col">Tempo de conjuração</th>
            <th scope="col">Componentes</th>
            <th scope="col">Duração</th>
            <th scope="col">Ritual</th>
          </tr>
        </thead>

        <tbody>
          {spells.slice(0, 4).map(spell => (
            <SpellRow spell={spell} key={spell.name} />
          ))}
        </tbody>
      </table>
    </Panel>
  );
}
