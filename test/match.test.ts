import { flip, pipe } from "fp-ts/function";
import { match, matchOn } from "../src";
import { expectTypeOf } from "expect-type";

describe("match", () => {
  type Input = { _tag: "foo" } | { _tag: "bar" };
  it("passes input to case whose key matches the value of the '_tag' field", () => {
    const behaviour = jest.fn(() => undefined);
    const input = { _tag: "foo" };
    pipe(
      input as Input,
      match({
        foo: behaviour,
        bar: () => undefined,
      })
    );
    expect(behaviour).toHaveBeenCalledWith(input);
  });

  it("ensures that cases are exhaustive", () => {
    type ExhaustiveCases = {
      foo: (v: { _tag: "foo" }) => unknown;
      bar: (v: { _tag: "bar" }) => unknown;
    };
    const input = { _tag: "foo" };
    const fnExpectingCases = flip(match)(input as Input);
    type Cases = Parameters<typeof fnExpectingCases>;
    expectTypeOf<Cases[0]>().toEqualTypeOf<ExhaustiveCases>();
  });

  it("has a union of the return types of all cases as its return type", () => {
    const input = { _tag: "foo" };
    const matchResult = pipe(
      input as Input,
      match({
        foo: () => 42,
        bar: () => "hello",
      })
    );
    expectTypeOf(matchResult).toEqualTypeOf<number | string>;
  });
});

describe("matchOn", () => {
  it("passes input to case whose key matches the value of the specified tag field", () => {
    const behaviour = jest.fn(() => undefined);
    type Input = { name: "foo" } | { name: "bar" };
    const input = { name: "foo", value: 42 };
    pipe(
      input as Input,
      matchOn("name", {
        foo: behaviour,
        bar: () => undefined,
      })
    );
    expect(behaviour).toHaveBeenCalledWith(input);
  });
});
