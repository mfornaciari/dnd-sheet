import type { Spell } from "@/types";
import "./Table.css";

type SpellTableData = Omit<
  Spell,
  | "__typename"
  | "level"
  | "characterClasses"
  | "range"
  | "materialComponents"
  | "description"
  | "atHigherLevels"
  | "inSrd"
>;

type TableProps = {
  caption: string;
  headerTitles: string[];
  data: SpellTableData[];
};

export function Table({ caption, headerTitles, data }: TableProps): JSX.Element {
  const headers = headerTitles.map(title => (
    <th scope="col" key={title}>
      {title}
    </th>
  ));
  const rows = data.map(item => buildRow(item));

  return (
    <table>
      <caption>{caption}</caption>

      <thead>
        <tr aria-label="headers">{headers}</tr>
      </thead>

      <tbody>{rows}</tbody>
    </table>
  );
}

function buildRow(item: SpellTableData): JSX.Element {
  const values = Object.values(item);
  const cells = values.map((value, index) => {
    if (index === 0) return <th scope="row">{parseValue(value)}</th>;
    return <td key={`cell${index}`}>{parseValue(value)}</td>;
  });
  const ariaLabel = String(values[0]);
  return <tr aria-label={ariaLabel}>{cells}</tr>;
}

function parseValue(value: string | string[] | number | boolean): string {
  if (Array.isArray(value)) return value.join(", ");
  if (typeof value === "boolean") return value ? "Sim" : "Não";
  return String(value);
}
