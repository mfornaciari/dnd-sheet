import { render, screen } from "@testing-library/react";
import { InputText } from "./InputText";

describe("InputText", () => {
  it("renders correctly", async () => {
    render(
      <InputText
        name="test"
        invalid={false}
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
        invalid={true}
        register={jest.fn()}
      />
    );
    const input: HTMLInputElement = screen.getByRole("textbox");
    const container = input.parentElement!;

    expect(container).toHaveClass("container invalid");
  });
});
