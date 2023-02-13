import { Predicate } from "fp-ts/lib/Predicate";

type Cond = <A, B>(
  cases: ReadonlyArray<[Predicate<A>, (a: A) => B]>,
  defaultBehaviour: (a: A) => B
) => (input: A) => B;

export const cond: Cond = (cases, defaultBehaviour) => (input) => {
  return defaultBehaviour(input);
};
