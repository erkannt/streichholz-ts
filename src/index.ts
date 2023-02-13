import { Predicate } from "fp-ts/lib/Predicate";

type Cond = <A, B>(
  cases: ReadonlyArray<[Predicate<A>, (a: A) => B]>,
  defaultBehaviour: (a: A) => B
) => (input: A) => B;

export const cond: Cond = (cases, defaultBehaviour) => (input) => {
  for (const c of cases) {
    if (c[0](input)) {
      return c[1](input);
    }
  }
  return defaultBehaviour(input);
};
