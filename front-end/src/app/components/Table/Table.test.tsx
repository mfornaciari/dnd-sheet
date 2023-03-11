import { render, screen, within } from "@testing-library/react";
import { Table } from "./Table";

describe("Table", () => {
  it("renders correctly", () => {
    const headerTitles = ["header1", "header2"];
    render(
      <Table caption="test" headerTitles={headerTitles}>
        <tr>
          <td>cell1</td>
          <td>cell2</td>
        </tr>
      </Table>
    );
    const table: HTMLTableElement = screen.getByRole("table");
    const headerRow: HTMLTableRowElement = within(table).getByRole("row", { name: "headers" });
    const headerCells: HTMLTableCellElement[] = within(headerRow).getAllByRole("columnheader");
    const dataRow: HTMLTableRowElement = within(table).getByRole("row", { name: "cell1 cell2" });
    const dataCells: HTMLTableCellElement[] = within(dataRow).getAllByRole("cell");

    expect(table).toHaveAccessibleName(/^test$/);
    let headerIndex = 1;
    for (const headerCell of headerCells) {
      expect(headerCell).toHaveTextContent(new RegExp(`^header${headerIndex}$`));
      headerIndex += 1;
    }
    let dataIndex = 1;
    for (const dataCell of dataCells) {
      expect(dataCell).toHaveTextContent(new RegExp(`^cell${dataIndex}$`));
      dataIndex += 1;
    }
  });
});
