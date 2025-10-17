import formatTime from "../src/lib/formatTime";
import genId from "../src/lib/genId";
import getBestTime from "../src/lib/getBestTime";
import formatDate from "../src/lib/formatDate";
import { Solve } from "../src/interfaces/Solve";

// 1. Test for formatTime

describe("formatTime", () => {
  test("formats milliseconds to mm:ss.SS", () => {
    expect(formatTime(65000)).toBe("1:05.00");
    expect(formatTime(123456, 3)).toBe("2:03.456");
    expect(formatTime(900, 1)).toBe("0.9");
  });

  test("returns seconds only if minutes are zero", () => {
    expect(formatTime(5000)).toBe("5.00");
  });
});

// 2. Test for genId (stub uuid)

describe("genId", () => {
  test("returns a valid UUID string", () => {
    const uuid = genId();
    expect(typeof uuid).toBe("string");
    expect(uuid.length).toBeGreaterThan(10);
  });
});

// 3. Test for getBestTime

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

  test("throws error if time is missing", () => {
    expect(() =>
      getBestTime({ solves: [{ ...solves[0], time: undefined as any }] })
    ).toThrow();
  });
});

// 4. Test for formatDate

describe("formatDate", () => {
  test("formats ms timestamp to MM-DD-YYYY", () => {
    expect(formatDate(Date.UTC(2023, 0, 2))).toMatch(/01-02-2023/);
  });
});

// 5. Test double for getBestTime (mock sort)

describe("getBestTime with mock sort", () => {
  test("calls sort and asc once (mock)", () => {
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
    ];
    const fastSort = require("fast-sort");
    const originalSort = fastSort.sort;
    let calledSort = false;
    let calledAsc = false;
    fastSort.sort = () => ({
      asc: (fn: any) => {
        calledSort = true;
        calledAsc = true;
        return solves;
      },
    });
    getBestTime({ solves });
    expect(calledSort).toBe(true);
    expect(calledAsc).toBe(true);
    fastSort.sort = originalSort;
  });
});
