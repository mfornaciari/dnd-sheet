import type { CharacterClass } from "@/types";
import { calculateLevel, findClassName } from "./useCharacterFormHelpers";
import fetchedDataMock from "../../../../test/fetchedDataMock.json";

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

describe("findClassName", () => {
  const characterClasses = fetchedDataMock.data.characterClasses as CharacterClass[];
  it("returns matching class name if ID is found in the class data provided", () => {
    const selectedClassId = "1";

    const result = findClassName(characterClasses, selectedClassId);

    expect(result).toEqual("barbarian");
  });

  it("returns 'characterClass' if ID is not found in the class data provided", () => {
    const selectedClassId = "4";

    const result = findClassName(characterClasses, selectedClassId);

    expect(result).toEqual("characterClass");
  });
});

describe("generateURL", () => {
  const { generateURL } = jest.requireActual("./useCharacterFormHelpers");
  window.URL.createObjectURL = jest.fn();

  it("generates URL to download provided form values as JSON file", () => {
    const formValues = {
      name: "Bruenor",
      race: fetchedDataMock.data.races[0].id,
      characterClass: fetchedDataMock.data.characterClasses[0].id,
      experience: "300",
    };
    const blob = new Blob([JSON.stringify(formValues)], { type: 'application/json' });

    generateURL(formValues);

    expect(window.URL.createObjectURL).toHaveBeenCalledWith(blob);
  });
});
