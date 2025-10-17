import getBestTime from "../src/lib/getBestTime";
import { Solve } from "../src/interfaces/Solve";

describe("getBestTime", () => {
  const solves: Solve[] = [
    {
      id: "1",
      cubeId: "c1",
      scramble: "A",
      startTime: 0,
      endTime: 1000,
      bookmark: false,
      time: 1000,
      rating: 0,
      dnf: false,
      plus2: false,
    },
    {
      id: "2",
      cubeId: "c1",
      scramble: "B",
      startTime: 0,
      endTime: 800,
      bookmark: false,
      time: 800,
      rating: 0,
      dnf: false,
      plus2: false,
    },
    {
      id: "3",
      cubeId: "c1",
      scramble: "C",
      startTime: 0,
      endTime: 1200,
      bookmark: false,
      time: 1200,
      rating: 0,
      dnf: false,
      plus2: false,
    },
  ];

  test("returns the best (lowest) time", () => {
    expect(getBestTime({ solves })).toBe(800);
  });

  test("returns 0 for empty array", () => {
    expect(getBestTime({ solves: [] })).toBe(0);
  });

  test("throws error if time is missing", () => {
    expect(() =>
      getBestTime({ solves: [{ ...solves[0], time: undefined as any }] })
    ).toThrow();
  });

  test("throws error if time is not a number", () => {
    expect(() =>
      getBestTime({ solves: [{ ...solves[0], time: "abc" as any }] })
    ).toThrow();
  });
});
