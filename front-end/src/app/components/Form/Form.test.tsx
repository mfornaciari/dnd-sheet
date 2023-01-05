import type { FetchedData } from "@/types";
import { render, screen, waitFor, within } from "@testing-library/react";
import user from "@testing-library/user-event";
import i18next from "i18next";
import fetchedDataMock from "@/test/fetchedDataMock.json";
import { Form } from "./Form";

describe("Form", () => {
  const data = fetchedDataMock.data as FetchedData;

  it("works correctly", async () => {
    await waitFor(() => render(<Form data={data} />));
    const form: HTMLFormElement = screen.getByRole("form", { name: "Formulário" });
    const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Nome" });
    const raceInput: HTMLInputElement = within(form).getByRole("combobox", { name: "Raça" });
    const classInput: HTMLInputElement = within(form).getByRole("combobox", { name: "Classe" });
    const xpInput: HTMLInputElement = within(form).getByRole("spinbutton", { name: "Experiência" });
    const inputContainers = [nameInput, raceInput, classInput, xpInput].map(input => input.parentElement);
    const saveButton = within(form).getByRole("button", { name: "Salvar" });

    // Disables save button when required inputs aren't filled yet
    expect(nameInput).toHaveDisplayValue([""]);
    expect(raceInput).toHaveDisplayValue([]);
    expect(classInput).toHaveDisplayValue([]);
    expect(xpInput).toHaveDisplayValue(["0"]);
    expect(saveButton).toHaveClass("disabled-link");

    // Gives invalid inputs a red outline
    await user.clear(nameInput);
    await user.click(raceInput);
    await user.click(classInput);
    await user.clear(xpInput);
    await user.click(document.body);

    for (const container of inputContainers) {
      expect(container).toHaveClass("invalid");
    }

    // Saves entered data to localStorage
    await user.type(nameInput, "Bruenor");
    await user.selectOptions(raceInput, data.races[0].name);
    await user.selectOptions(classInput, i18next.t(data.characterClasses[0].name));
    await user.type(xpInput, "300");

    const expectedValues = JSON.stringify({
      name: "Bruenor",
      race: fetchedDataMock.data.races[0].name,
      characterClass: fetchedDataMock.data.characterClasses[0].name,
      experience: "300",
    });
    expect(localStorage.characterValues).toEqual(expectedValues);

    // Enabled save button when required fields are filled
    expect(saveButton).not.toHaveClass("disabled-link");
    expect(saveButton).toHaveAttribute("download", "Bruenor");
    expect(saveButton).toHaveAttribute("href", "http://localhost:3000/mockURL");
  });

  it("loads data from file", async () => {
    localStorage.clear();
    await waitFor(() => render(<Form data={data} />));
    const form: HTMLFormElement = screen.getByRole("form", { name: "Formulário" });
    const nameInput: HTMLInputElement = within(form).getByRole("textbox", { name: "Nome" });
    const raceInput: HTMLInputElement = within(form).getByRole("combobox", { name: "Raça" });
    const classInput: HTMLInputElement = within(form).getByRole("combobox", { name: "Classe" });
    const xpInput: HTMLInputElement = within(form).getByRole("spinbutton", { name: "Experiência" });
    const loadButton: HTMLInputElement = within(form).getByRole("button", { name: "Carregar" });
    const fileValues = JSON.stringify({
      name: "Jozan",
      race: fetchedDataMock.data.races[1].name,
      characterClass: fetchedDataMock.data.characterClasses[1].name,
      experience: "0",
    });
    const file = new File([fileValues], "Jozan.json", { type: "application/json" });
    File.prototype.text = jest.fn().mockResolvedValue(fileValues);

    await user.upload(loadButton, file);

    expect(localStorage.characterValues).toEqual(fileValues);
    expect(nameInput).toHaveDisplayValue("Jozan");
    expect(raceInput).toHaveDisplayValue(i18next.t(fetchedDataMock.data.races[1].name));
    expect(classInput).toHaveDisplayValue(i18next.t(fetchedDataMock.data.characterClasses[1].name));
    expect(xpInput).toHaveDisplayValue("0");
  });
});
