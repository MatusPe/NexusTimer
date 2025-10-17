import formatTime from "../src/lib/formatTime";

describe("formatTime", () => {
  test("formats milliseconds to mm:ss.SS", () => {
    expect(formatTime(65000)).toBe("1:05.00");
    expect(formatTime(123456, 3)).toBe("2:03.456");
    expect(formatTime(900, 1)).toBe("0.9");
  });

  test("returns seconds only if minutes are zero", () => {
    expect(formatTime(5000)).toBe("5.00");
  });

  test("handles zero milliseconds", () => {
    expect(formatTime(0)).toBe("0.00");
  });

  test("handles negative input", () => {
    expect(formatTime(-1000)).toBe("-1.00");
  });
});
