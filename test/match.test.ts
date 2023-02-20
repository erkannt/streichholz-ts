import { pipe } from "fp-ts/function";
import { match } from "../src";

describe("match", () => {
  it("passes input to case whose key matches the value of the tag field", () => {
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
