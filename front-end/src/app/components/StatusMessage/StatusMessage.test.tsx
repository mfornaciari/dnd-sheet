import { render, screen } from "@testing-library/react";
import { StatusMessage } from "./StatusMessage";

describe("StatusMessage", () => {
  it("renders correctly with message", () => {
    render(
      <StatusMessage message="test" />
    );
    const div = screen.getByRole("status");

    expect(div).toHaveAccessibleName("test");
    expect(div).toHaveTextContent(/^test$/);
  });
});
