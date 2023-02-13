import { pipe } from "fp-ts/function";
import { cond, match } from "../src";

describe("cond", () => {
  it("passes input to first condition that returns true", () => {
    const behaviour1 = jest.fn(() => undefined);
    const behaviour2 = jest.fn(() => undefined);
    const defaultBehaviour = jest.fn(() => undefined);
    const input = 5;

    pipe(
      input,
      cond(
        [
          [(n) => n != input, behaviour1],
          [(n) => n == input, behaviour2],
        ],
        defaultBehaviour
      )
    );
    expect(behaviour1).not.toHaveBeenCalled;
    expect(behaviour2).toHaveBeenCalledWith(input);
    expect(defaultBehaviour).not.toHaveBeenCalled;
  });

  it("passes input to default behaviour if none of the conditions hold true", () => {
    const behaviour1 = jest.fn(() => undefined);
    const behaviour2 = jest.fn(() => undefined);
    const defaultBehaviour = jest.fn(() => undefined);
    const input = 5;

    pipe(
      input,
      cond(
        [
          [(n) => false, behaviour1],
          [(n) => false, behaviour2],
        ],
        defaultBehaviour
      )
    );
    expect(behaviour1).not.toHaveBeenCalled;
    expect(behaviour2).not.toHaveBeenCalled;
    expect(defaultBehaviour).toHaveBeenCalledWith(input);
  });
});

describe("match", () => {
  it.failing(
    "passes input to case whose key matches the value of the tag field",
    () => {
      const behaviour = jest.fn(() => undefined);
      const input = { _tag: "foo", value: 42 };
      pipe(
        input,
        match({
          foo: behaviour,
        })
      );
      expect(behaviour).toHaveBeenCalledWith(input);
    }
  );
});
