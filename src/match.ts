type MakeADTMember<T extends string, U, K extends string> = Extract<
  U,
  Record<T, K>
>;

type MakeCasesObj<T extends string, U extends Record<T, string>, Z> = {
  [K in U[T]]: (v: MakeADTMember<T, U, K>) => Z;
};

type MakeReturns<
  D extends string,
  U extends Record<D, string>,
  M extends MakeCasesObj<D, U, unknown>
> = {
  [K in keyof M]: ReturnType<M[K]>;
}[keyof M];

type MatchOn = <
  T extends string,
  A extends Record<T, string>,
  C extends MakeCasesObj<T, A, unknown>
>(
  discriminant: T,
  matchObj: C
) => (input: A) => MakeReturns<T, A, C>;

export const matchOn: MatchOn = (discriminant, cases) => (input) => {
  return cases[input[discriminant]](input as any) as any;
};

type MakeMatch = <D extends string>(
  discriminant: D
) => <A extends Record<D, string>, C extends MakeCasesObj<D, A, unknown>>(
  cases: C
) => (input: A) => MakeReturns<D, A, C>;

export const makeMatch: MakeMatch = (discriminant) => (cases) =>
  matchOn(discriminant, cases);

export const match = makeMatch("_tag");
