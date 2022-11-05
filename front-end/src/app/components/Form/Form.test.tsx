import type { FetchedData } from "@/types";
import { render, screen, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import i18next from "i18next";
import fetchedDataMock from "@/test/fetchedDataMock.json";
import { Form } from "./Form";

describe("Form", () => {
  afterEach(() => localStorage.clear());

  it("works correctly", async () => {
    const data = fetchedDataMock.data as FetchedData;
    render(<Form data={data} />);
    const form: HTMLFormElement = screen.getByRole("form", { name: "Formulário" });
    const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Nome" });
    const raceInput: HTMLInputElement = within(form).getByRole("combobox", { name: "Raça" });
    const classInput: HTMLInputElement = within(form).getByRole("combobox", { name: "Classe" });
    const xpInput: HTMLInputElement = within(form).getByRole("spinbutton", { name: "Experiência" });

    // Gives invalid input a red outline
    await user.click(nameInput);
    await user.click(document.body);

    const nameInputContainer = nameInput.parentElement;
    expect(nameInputContainer).toHaveClass("invalid");

    // Saves entered data to localStorage
    await user.type(nameInput, "Bruenor");
    await user.selectOptions(raceInput, data.races[0].name);
    await user.selectOptions(classInput, i18next.t(data.characterClasses[0].name));
    await user.type(xpInput, "300");

    const expectedValues = JSON.stringify({
      name: "Bruenor",
      race: fetchedDataMock.data.races[0].id,
      characterClass: fetchedDataMock.data.characterClasses[0].id,
      experience: "300",
    });
    expect(localStorage.characterValues).toEqual(expectedValues);

    //TODO: Test save button
  });

  it("loads data from file", async () => {
    const data = fetchedDataMock.data as FetchedData;
    render(<Form data={data} />);
    const form: HTMLFormElement = screen.getByRole("form", { name: "Formulário" });
    const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Nome" });
    const raceInput: HTMLInputElement = within(form).getByRole("combobox", { name: "Raça" });
    const classInput: HTMLInputElement = within(form).getByRole("combobox", { name: "Classe" });
    const xpInput: HTMLInputElement = within(form).getByRole("spinbutton", { name: "Experiência" });
    const loadButton: HTMLInputElement = within(form).getByRole("button", { name: "Carregar" });
    const fileValues = JSON.stringify({
      name: "Jozan",
      race: fetchedDataMock.data.races[1].id,
      characterClass: fetchedDataMock.data.characterClasses[1].id,
      experience: "0",
    });
    const file = new File([fileValues], "Jozan.json", { type: "application/json" });
    File.prototype.text = jest.fn().mockResolvedValue(fileValues);

    await user.upload(loadButton, file);

    expect(localStorage.characterValues).toEqual(fileValues);
    expect(nameInput).toHaveDisplayValue("Jozan");
    expect(raceInput).toHaveDisplayValue(fetchedDataMock.data.races[1].name);
    expect(classInput).toHaveDisplayValue(i18next.t(fetchedDataMock.data.characterClasses[1].name));
    expect(xpInput).toHaveDisplayValue("0");
  });
});
