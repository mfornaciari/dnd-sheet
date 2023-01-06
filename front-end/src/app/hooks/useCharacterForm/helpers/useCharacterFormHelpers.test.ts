import { calculateLevel } from "./useCharacterFormHelpers";
import fetchedDataMock from "@/test/fetchedDataMock.json";

describe("calculateLevel", () => {
  const levels = fetchedDataMock.data.levels;

  it("returns level number if experience is within defined boundaries", () => {
    const experience = 300;

    const result = calculateLevel(levels, experience);

    expect(result).toEqual(2);
  });

  it("returns 20 if experience is above defined boundaries", () => {
    const experience = 2700;

    const result = calculateLevel(levels, experience);

    expect(result).toEqual(20);
  });

  it("returns 1 if experience is below defined boundaries", () => {
    const experience = -1;

    const result = calculateLevel(levels, experience);

    expect(result).toEqual(1);
  });

  it("returns 1 if experience is NaN", () => {
    const experience = NaN;

    const result = calculateLevel(levels, experience);

    expect(result).toEqual(1);
  });
});

describe("generateURL", () => {
  const { generateURL } = jest.requireActual("./useCharacterFormHelpers");
  window.URL.createObjectURL = jest.fn();

  it("generates URL to download provided form values as JSON file", () => {
    const formValues = {
      name: "Bruenor",
      race: fetchedDataMock.data.races[0].name,
      characterClass: fetchedDataMock.data.characterClasses[0].name,
      experience: "300",
    };
    const blob = new Blob([JSON.stringify(formValues)], { type: "application/json" });

    generateURL(formValues);

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
  });
});
