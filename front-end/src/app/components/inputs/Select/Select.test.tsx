import type { CharacterClassName, Option } from "@/types";
import { render, screen, within } from "@testing-library/react";
import i18next from "i18next";
import fetchedDataMock from "@/test/fetchedDataMock.json";
import { Select } from "./Select";

describe("Select", () => {
  const optionDataMock = fetchedDataMock.data.characterClasses.map(
    characterClass => characterClass.name
  ) as CharacterClassName[];

  it("renders correctly", () => {
    render(<Select name="test" invalid={false} optionData={optionDataMock} register={jest.fn()} />);
    const input: HTMLInputElement = screen.getByRole("combobox");
    const container = input.parentElement;
    const inputOptions: HTMLOptionElement[] = within(input).getAllByRole("option");

    expect(input).toHaveAccessibleName("test");
    expect(input).toHaveClass("input");
    expect(container).toHaveClass("container");
    for (const option of inputOptions) {
      const regex = createOptionRegex(optionDataMock, option);
      expect(option).toHaveTextContent(regex);
    }
  });

  it("has red outline when invalid", async () => {
    render(<Select name="test" invalid={true} optionData={optionDataMock} register={jest.fn()} />);
    const input: HTMLInputElement = screen.getByRole("combobox");
    const container = input.parentElement!;

    expect(container).toHaveClass("container invalid");
  });
});

function createOptionRegex(data: Option[], option: HTMLOptionElement): RegExp {
  function getOptionValue(option: HTMLOptionElement): string {
    return String(option.getAttribute("value"));
  }

  const value = getOptionValue(option);
  const name = i18next.t(value);
  return new RegExp(`^${name}$`);
}
