import { calculateLevel, findClassName } from "@/helpers/formHelpers";
import fetchedDataMock from "../fetchedDataMock.json";

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
});

describe("findClassName", () => {
  const characterClasses = fetchedDataMock.data.characterClasses;
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
  const { generateURL } = jest.requireActual("@/helpers/formHelpers");
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
