import { render, screen } from "@testing-library/react";
import { TabPanel } from "@/components/tabs/TabPanel";

describe("TabPanel", () => {
  it("renders correctly with children", () => {
    render(
      <TabPanel tabButtonName="personal">
        test
      </TabPanel>
    );
    const panel = screen.getByRole("tabpanel");

    expect(panel).toHaveAttribute("id", "tab-panel");
    expect(panel).toHaveAttribute("aria-labelledby", "personal");
    expect(panel).toHaveAttribute("aria-expanded", "true");
    expect(panel).toHaveTextContent(/^test$/);
  });
});
