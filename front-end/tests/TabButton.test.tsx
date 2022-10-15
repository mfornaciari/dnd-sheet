import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { TabButton } from "@/components/TabButton";

describe("TabButton", () => {
  const mockHandleClick = jest.fn();

  it("renders correctly when selected and title is passed", async () => {
    render(
      <TabButton
        tabKind="characterClass"
        isSelected={true}
        handleClick={mockHandleClick}
        title="barbarian"
      />
    );
    const button: HTMLButtonElement = screen.getByRole("tab");

    await user.click(button);

    expect(button).toHaveAttribute("type", "button");
    expect(button).toHaveAttribute("id", "characterClass");
    expect(button).toHaveAttribute("aria-selected", "true");
    expect(button).toHaveClass("tab-button");
    expect(button).toHaveAccessibleName("Bárbaro");
    expect(mockHandleClick).toHaveBeenCalledTimes(1);
  });

  it("renders correctly when not selected", () => {
    render(
      <TabButton
        tabKind="characterClass"
        isSelected={false}
        handleClick={mockHandleClick}
        title="barbarian"
      />
    );
    const button = screen.getByRole("tab");

    expect(button).toHaveAttribute("aria-selected", "false");
  });
});
