import { flip, pipe } from "fp-ts/function";
import { match, matchOn } from "../src";
import { expectTypeOf } from "expect-type";

describe("match", () => {
  it("passes input to case whose key matches the value of the '_tag' field", () => {
    const behaviour = jest.fn(() => undefined);
    const input = { _tag: "foo" };
    pipe(
      input,
      match({
        foo: behaviour,
      })
    );
    expect(behaviour).toHaveBeenCalledWith(input);
  });

  it.skip("ensures that cases are exhaustive", () => {
    type Input = { _tag: "foo" } | { _tag: "bar" };
    const input: Input = { _tag: "foo" };
    const fnExpectingCases = flip(match)(input);
    type Cases = Parameters<typeof fnExpectingCases>;
    type Tags = keyof Cases[0];
    // @ts-expect-error
    expectTypeOf<Tags>().toEqualTypeOf<["foo", "bar"]>();
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
