import { calculateLevel, findClassName, generateURL } from "@/helpers/formHelpers";
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
