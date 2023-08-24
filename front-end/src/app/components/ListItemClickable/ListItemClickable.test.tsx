import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { ListItemClickable } from "./ListItemClickable";

describe("ListItemClickable", () => {
  it("renders correctly", async () => {
    let counter = 0;
    function handleClick(): void {
      counter += 1;
    }

    render(
      <ListItemClickable key="key" handleClick={handleClick}>
        Click me
      </ListItemClickable>
    );

    const listItem: HTMLLIElement = screen.getByRole("listitem");
    expect(listItem).toHaveTextContent(/^Click me$/);
    expect(listItem).toHaveAccessibleName("Click me");

    await user.click(listItem);

    expect(counter).toEqual(1);
  });
});
