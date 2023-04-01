import type { Spell } from "@/types";

type SpellRowProps = {
  spell: Spell;
};

export function SpellRow({ spell }: SpellRowProps): JSX.Element {
  return (
    <tr aria-label={spell.name}>
      <th scope="row">{spell.name}</th>
      <td>{spell.school}</td>
      <td>{spell.castingTime}</td>
      <td>{spell.components.join(", ")}</td>
      <td>{spell.duration}</td>
      <td>{spell.ritual ? "Yes" : "No"}</td>
    </tr>
  );
}
