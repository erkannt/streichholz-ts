import { Lazy } from "fp-ts/lib/function";
import { Predicate } from "fp-ts/lib/Predicate";

type Cond = <A>(
  cases: ReadonlyArray<[Predicate<A>, (a: A) => A]>,
  defaultBehaviour: (a: A) => A
) => (input: A) => A;

export const cond: Cond = () => (input) => {
  return input;
};
