import { Predicate } from "fp-ts/lib/Predicate";

type CondP = <A, B>(
  cases: ReadonlyArray<[Predicate<A>, (a: A) => B]>,
  defaultBehaviour: (a: A) => B
) => (input: A) => B;

export const condP: CondP = (cases, defaultBehaviour) => (input) => {
  for (const [predicate, behaviour] of cases) {
    if (predicate(input)) {
      return behaviour(input);
    }
  }
  return defaultBehaviour(input);
};
