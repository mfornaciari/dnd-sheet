import { render, screen } from "@testing-library/react";
import { InputText } from "@/components/inputs/InputText";

describe("InputText", () => {
  it("renders correctly", async () => {
    render(
      <InputText
        name="test"
        placeholderText="placeholder text"
        register={jest.fn()}
      />
    );
    const input: HTMLInputElement = screen.getByRole("textbox");
    const container = input.parentElement!;

    expect(input).toHaveAccessibleName("test");
    expect(input).toHaveClass("input");
    expect(input).toHaveAttribute("placeholder", "placeholder text");
    expect(container).toHaveClass("container");
  });

  it("has red outline when invalid", async () => {
    render(
      <InputText
        name="test"
        error={true}
        register={jest.fn()}
      />
    );
    const input: HTMLInputElement = screen.getByRole("textbox");
    const container = input.parentElement!;

    expect(container).toHaveClass("container invalid");
  });
});
