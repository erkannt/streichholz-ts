/*
This code is based on pfgray/ts-adt (MIT License)
*/

type MakeCases<T extends string, U extends Record<T, string>, Z> = {
  [K in U[T]]: (v: Extract<U, Record<T, K>>) => Z;
};

type MakeReturns<
  D extends string,
  U extends Record<D, string>,
  M extends MakeCases<D, U, unknown>
> = {
  [K in keyof M]: ReturnType<M[K]>;
}[keyof M];

type MatchOn = <
  T extends string,
  A extends Record<T, string>,
  C extends MakeCases<T, A, unknown>
>(
  discriminant: T,
  matchObj: C
) => (input: A) => MakeReturns<T, A, C>;

export const matchOn: MatchOn = (discriminant, cases) => (input) => {
  return cases[input[discriminant]](input as any) as any;
};

type MakeMatch = <D extends string>(
  discriminant: D
) => <A extends Record<D, string>, C extends MakeCases<D, A, unknown>>(
  cases: C
) => (input: A) => MakeReturns<D, A, C>;

export const makeMatch: MakeMatch = (discriminant) => (cases) =>
  matchOn(discriminant, cases);

export const match = makeMatch("_tag");
