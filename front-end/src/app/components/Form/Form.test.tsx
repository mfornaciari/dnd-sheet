import type { FetchedData } from "@/types";
import { render, screen, within } from "@testing-library/react";
import "./Form.css";
import fetchedDataMock from "@/test/fetchedDataMock.json";
import { Form } from "./Form";

describe("Form", () => {
  it("renders correctly", () => {
    const data = fetchedDataMock.data as FetchedData;

    render(<Form data={data} />);
    const form = screen.getByRole("form", { name: "Formulário" });
    const nameInput = within(form).getByRole("textbox", { name: "Nome" });
    const raceInput = within(form).getByRole("combobox", { name: "Raça" });
    const classInput = within(form).getByRole("combobox", { name: "Classe" });
    const xpInput = within(form).getByRole("spinbutton", { name: "Experiência" });
    const tabPanel = within(form).getByRole("tabpanel", { name: "Pessoal" });
    const tabButtonPersonal = within(form).getByRole("tab", { name: "Pessoal" });
    const tabButtonAttributes = within(form).getByRole("tab", { name: "Atributos" });
    const tabButtonClass = within(form).getByRole("tab", { name: "Classe" });
    const tabButtonSpells = within(form).getByRole("tab", { name: "Magias" });
    const tabButtonItems = within(form).getByRole("tab", { name: "Itens" });
  });
});
