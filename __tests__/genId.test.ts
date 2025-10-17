import genId from "../src/lib/genId";

describe("genId", () => {
  it("returns a valid UUID string (mocked)", () => {
    jest.resetModules();
    jest.doMock("uuid", () => ({ v4: () => "fake-uuid-1234" }));
    const genIdMocked = require("../src/lib/genId").default;
    const uuid = genIdMocked();
    expect(typeof uuid).toBe("string");
    expect(uuid).toBe("fake-uuid-1234");
    jest.dontMock("uuid");
  });

  it("returns different UUIDs on multiple calls (real)", () => {
    const uuid1 = genId();
    const uuid2 = genId();
    expect(uuid1).not.toBe(uuid2);
    expect(typeof uuid1).toBe("string");
    expect(typeof uuid2).toBe("string");
    expect(uuid1.length).toBeGreaterThan(10);
    expect(uuid2.length).toBeGreaterThan(10);
  });
});
