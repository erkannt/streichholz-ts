import { pipe } from "fp-ts/function";
import { match, matchOn } from "../src";

describe("match", () => {
  it("passes input to case whose key matches the value of the '_tag' field", () => {
    const behaviour = jest.fn(() => undefined);
    const input = { _tag: "foo", value: 42 };
    pipe(
      input,
      match({
        foo: behaviour,
      })
    );
    expect(behaviour).toHaveBeenCalledWith(input);
  });
});

describe("matchOn", () => {
  it("passes input to case whose key matches the value of the specified tag field", () => {
    const behaviour = jest.fn(() => undefined);
    const input = { name: "foo", value: 42 };
    pipe(
      input,
      matchOn("name", {
        foo: behaviour,
      })
    );
    expect(behaviour).toHaveBeenCalledWith(input);
  });
});
