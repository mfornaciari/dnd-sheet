import type { PropsWithChildren } from "react";
import "./Table.css";

type TableProps = {
  caption: string;
  headerTitles: string[];
};

export function Table({ caption, headerTitles, children }: PropsWithChildren<TableProps>): JSX.Element {
  const headers = headerTitles.map(title => (
    <th scope="col" key={title}>
      {title}
    </th>
  ));

  return (
    <table>
      <caption>{caption}</caption>

      <thead>
        <tr aria-label="headers">{headers}</tr>
      </thead>

      <tbody>{children}</tbody>
    </table>
  );
}
