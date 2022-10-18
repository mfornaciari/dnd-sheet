import { render, screen } from "@testing-library/react";
import { TabPanel } from "@/components/tabs/TabPanel";

describe("TabPanel", () => {
  it("renders correctly with children", () => {
    render(
      <TabPanel tabButtonId="personal">
        test
      </TabPanel>
    );
    const panel: HTMLDivElement = screen.getByRole("tabpanel");

    expect(panel).toHaveAttribute("id", "tab-panel");
    expect(panel).toHaveAttribute("aria-labelledby", "personal");
    expect(panel).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveTextContent(/^test$/);
  });
});
