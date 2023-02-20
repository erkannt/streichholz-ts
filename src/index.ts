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

type MakeADTMember<D extends string, ADT, Type extends string> = Extract<
  ADT,
  Record<D, Type>
>;

type MakeMatchObj<D extends string, ADT extends Record<D, string>, Z> = {
  [K in ADT[D]]: (v: MakeADTMember<D, ADT, K>) => Z;
};

type MakeReturns<
  D extends string,
  ADT extends Record<D, string>,
  M extends MakeMatchObj<D, ADT, unknown>
> = {
  [K in keyof M]: ReturnType<M[K]>;
}[keyof M];

type Match = <
  D extends string,
  A extends Record<D, string>,
  M extends MakeMatchObj<D, A, unknown>
>(
  matchObj: M,
  discriminant: D
) => (input: A) => MakeReturns<D, A, M>;

export const match: Match = (cases, discriminant) => (input) => {
  return cases[input[discriminant]](input as any) as any;
};
