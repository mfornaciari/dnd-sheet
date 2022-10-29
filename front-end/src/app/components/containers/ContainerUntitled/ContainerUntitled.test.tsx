import { render, screen } from "@testing-library/react";
import { ContainerUntitled } from "./ContainerUntitled";

describe("ContainerUntitled", () => {
  it("renders correctly with ARIA label", () => {
    render(
      <ContainerUntitled ariaLabel="test">
        Test
      </ContainerUntitled>
    );
    const container = screen.getByRole("region");

    expect(container).toHaveAccessibleName("test");
    expect(container).toHaveClass("container untitled");
    expect(container).toHaveTextContent(/^Test$/);
  });
});
