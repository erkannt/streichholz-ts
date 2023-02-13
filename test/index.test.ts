import { pipe } from "fp-ts/function";
import { cond } from "../src";

describe("cond", () => {
  it.failing("passes input to first condition that returns true", () => {
    const behaviour1 = jest.fn(() => 1);
    const behaviour2 = jest.fn(() => 1);
    const defaultBehaviour = jest.fn(() => 1);
    const input = 5;

    pipe(
      input,
      cond<number>(
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
});
