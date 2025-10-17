import getDeviation from "../src/lib/getDeviation";
import { FAKE_SESSION } from "../data/FAKE_SESSION";

describe("getDeviation Function Tests", () => {
  test("should return 0 when passing an empty array", () => {
    expect(getDeviation([])).toBe(0);
  });

  test("should calculate the standard deviation for a full session", () => {
    expect(getDeviation([...FAKE_SESSION])).toBe(1418.2807643598833);
  });

  test("should calculate the standard deviation for the first 5 solves in the session", () => {
    expect(getDeviation([...FAKE_SESSION].slice(0, 5))).toBe(
      1088.8310429079436
    );
  });

  test("should calculate the standard deviation for the first 12 solves in the session", () => {
    expect(getDeviation([...FAKE_SESSION].slice(0, 12))).toBe(
      1343.5132013576278
    );
  });

  test("should calculate the standard deviation for the first 50 solves in the session", () => {
    expect(getDeviation([...FAKE_SESSION].slice(0, 50))).toBe(
      1376.4910212565862
    );
  });

  test("should return 0 when the function is called without parameters", () => {
    expect(getDeviation()).toBe(0);
  });

  test("should return 0 when passing undefined as the parameter", () => {
    expect(getDeviation(undefined)).toBe(0);
  });

  test("should return 0 when passing null as the parameter", () => {
    expect(getDeviation(null)).toBe(0);
  });

  test("should return 0 when passing a string as the parameter", () => {
    expect(getDeviation("string")).toBe(0);
  });

  test("should return 0 when passing a number as the parameter", () => {
    expect(getDeviation(34)).toBe(0);
  });
});
