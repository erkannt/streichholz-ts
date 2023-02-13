import { Lazy } from "fp-ts/lib/function";
import { Predicate } from "fp-ts/lib/Predicate";

export const cond =
  <A>(
    cases: ReadonlyArray<[Predicate<A>, (a: A) => A]>,
    defaultBehaviour: (a: A) => A
  ) =>
  (input: A): A => {
    return input;
  };
