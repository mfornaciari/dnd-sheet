import type { CharacterValues } from "@/types";
import "@testing-library/jest-dom";
import i18next from "i18next";
import ptbr from "@/locales/pt-BR.json";

i18next.init({
  lng: "ptbr",
  debug: false,
  resources: ptbr
});

const mockURL = "http://localhost:3000/mockURL";
const mockGenerateURL = jest.fn((_formValues: CharacterValues) => mockURL);
jest.mock("@/app/hooks/useCharacterForm/helpers/useCharacterFormHelpers", () => {
  const original = jest.requireActual("@/app/hooks/useCharacterForm/helpers/useCharacterFormHelpers");

  return {
    ...original,
    generateURL: mockGenerateURL,
  };
});
