import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ListItemClickable } from "./ListItemClickable";

describe("ListItemClickable", () => {
  it("renders correctly", async () => {
    let counter = 0;
    function handleClick(): void {
      counter += 1;
    }

    render(<ListItemClickable onClick={handleClick}>Click me</ListItemClickable>);

    const listItem: HTMLLIElement = screen.getByRole("listitem");
    const button: HTMLButtonElement = within(listItem).getByRole("button");
    expect(button).toHaveTextContent(/^Click me$/);
    expect(button).toHaveAccessibleName("Click me");

    await user.click(button);

    expect(counter).toEqual(1);
  });
});
