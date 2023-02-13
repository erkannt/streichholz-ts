import { hello } from "../src";

describe("hello world", () => {
  it("contains hello", () => {
    expect(hello).toContain("hello");
  });
});
