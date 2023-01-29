import type { Spell } from "@/types";
import "./SpellRow.css";

type SpellRowProps = {
  spell: Spell;
};

export function SpellRow({ spell }: SpellRowProps): JSX.Element {
  return (
    <tr aria-label={spell.name}>
      <th className="spell-cell" scope="row">
        {spell.name}
      </th>
      <td className="spell-cell">{spell.school}</td>
      <td className="spell-cell">{spell.castingTime}</td>
      <td className="spell-cell">{spell.components.join(", ")}</td>
      <td className="spell-cell">{spell.duration}</td>
      <td className="spell-cell">{spell.ritual ? "Yes" : "No"}</td>
    </tr>
  );
}
