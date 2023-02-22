import { pipe } from "fp-ts/function";
import { condP } from "../src";

describe("condP", () => {
  it("passes input to first condition that returns true", () => {
    const behaviour1 = jest.fn(() => undefined);
    const behaviour2 = jest.fn(() => undefined);
    const defaultBehaviour = jest.fn(() => undefined);
    const input = 5;

    pipe(
      input,
      condP(
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
      condP(
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
