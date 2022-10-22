import { render, screen } from "@testing-library/react";
import { Panel } from "./Panel";

describe("TabPanel", () => {
  it("renders correctly with children", () => {
    render(
      <Panel tabButtonId="personal">
        test
      </Panel>
    );
    const panel: HTMLDivElement = screen.getByRole("tabpanel");

    expect(panel).toHaveAttribute("id", "tab-panel");
    expect(panel).toHaveAttribute("aria-labelledby", "personal");
    expect(panel).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveTextContent(/^test$/);
  });
});
