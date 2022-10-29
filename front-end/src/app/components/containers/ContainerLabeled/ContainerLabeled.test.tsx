import { render, screen } from "@testing-library/react";
import { ContainerLabeled } from "./ContainerLabeled";

describe("ContainerUntitled", () => {
  it("renders correctly with label for child", () => {
    render(
      <ContainerLabeled label="test label" labelFor="test">
        <input id="test" type="text" />
      </ContainerLabeled>
    );
    const container = screen.getByRole("presentation");
    const input = screen.getByRole("textbox");

    expect(container).toHaveClass("container");
    expect(input).toHaveAccessibleName("test label");
  });
});
