import { Predicate } from "fp-ts/lib/Predicate";

type Cond = <A, B>(
  cases: ReadonlyArray<[Predicate<A>, (a: A) => B]>,
  defaultBehaviour: (a: A) => B
) => (input: A) => B;

export const cond: Cond = (cases, defaultBehaviour) => (input) => {
  for (const [predicate, behaviour] of cases) {
    if (predicate(input)) {
      return behaviour(input);
    }
  }
  return defaultBehaviour(input);
};

type Match = <A>(cases: Record<string, unknown>) => (input: A) => A;

export const match: Match = () => (input) => {
  return input;
};
