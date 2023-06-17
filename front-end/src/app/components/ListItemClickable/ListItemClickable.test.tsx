import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ListItemClickable } from "./ListItemClickable";

describe("ListItemClickable", () => {
  it("renders correctly", async () => {
    let counter = 0;
    function handleClick(): void {
      counter += 1;
    }

    render(<ListItemClickable handleClick={handleClick}>Click me</ListItemClickable>);

    const listButton: HTMLButtonElement = screen.getByRole("button");
    expect(listButton).toHaveTextContent(/^Click me$/);
    expect(listButton).toHaveAccessibleName("Click me");

    await user.click(listButton);

    expect(counter).toEqual(1);
  });
});
