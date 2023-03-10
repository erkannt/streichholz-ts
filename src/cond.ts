import { Predicate } from "fp-ts/lib/Predicate";
import { Refinement } from 'fp-ts/lib/Refinement';

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

type Cond = <A, B extends A, C>(
  cases: ReadonlyArray<[Refinement<A, B>, (b: B) => C]>,
) => (input: A) => C;

export const cond: Cond = (cases) => (input) => {
  for (const [predicate, behaviour] of cases) {
    if (predicate(input)) {
      return behaviour(input);
    }
  }
  throw new Error("This should be prevented from happening at compile time");
  
};
