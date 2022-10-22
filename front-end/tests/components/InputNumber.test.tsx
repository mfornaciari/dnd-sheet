import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import { InputNumber } from "@/components/inputs/InputNumber";

describe("InputNumber", () => {
  const mockRegister = jest.fn();

  it("renders correctly", () => {
    render(
      <InputNumber
        name="test"
        minValue="0"
        maxValue="1"
        register={mockRegister}
      />
    );
    const input: HTMLInputElement = screen.getByRole("spinbutton", { name: "test" });
    const container = input.parentElement!;

    expect(input).toHaveClass("input");
    expect(input).toHaveAttribute("id", "test");
    expect(input).toHaveAttribute("min", "0");
    expect(input).toHaveAttribute("max", "1");
    expect(container).toHaveClass("container");
  });

  it("does not allow user to type in non-numeric characters", async () => {
    render(
      <InputNumber
        name="test"
        register={mockRegister}
      />
    );
    const input: HTMLInputElement = screen.getByRole("spinbutton", { name: "test" });

    await user.type(input, "!-.,1a2");

    expect(input).toHaveValue(12);
    expect(input).toHaveDisplayValue("12");
  });

  it("has red outline when invalid", async () => {
    render(
      <InputNumber
        name="test"
        error={true}
        register={mockRegister}
      />
    );
    const input: HTMLInputElement = screen.getByRole("spinbutton", { name: "test" });
    const container = input.parentElement!;

    expect(container).toHaveClass("container invalid");
  });
});
