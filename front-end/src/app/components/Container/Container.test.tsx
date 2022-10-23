import { render, screen } from "@testing-library/react";
import { Container } from "./Container";

describe("Container", () => {
  it("renders correctly with hidden title", () => {
    render(
      <Container title="test">
        Test
      </Container>
    );
    const container = screen.getByRole("region");

    expect(container).toHaveAccessibleName("test");
    expect(container).toHaveClass("container hidden-titled");
    expect(container).toHaveTextContent(/^Test$/);
  });

  it("renders correctly with label as title", () => {
    const labelElement = (
      <label htmlFor="test" className="title">
        Test
      </label>
    );
    render(
      <Container title={labelElement}>
        <input id="test" type="text" />
      </Container>
    );
    const container = screen.getByRole("presentation");
    const input = screen.getByRole("textbox");

    expect(container).toHaveClass("container");
    expect(input).toHaveAccessibleName("Test");
  });
});
