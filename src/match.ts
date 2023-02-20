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

type MatchOn = <
  D extends string,
  A extends Record<D, string>,
  M extends MakeMatchObj<D, A, unknown>
>(
  discriminant: D,
  matchObj: M
) => (input: A) => MakeReturns<D, A, M>;

export const matchOn: MatchOn = (discriminant, cases) => (input) => {
  return cases[input[discriminant]](input as any) as any;
};

type MakeMatch = <D extends string>(
  discriminant: D
) => <A extends Record<D, string>, M extends MakeMatchObj<D, A, unknown>>(
  cases: M
) => (input: A) => MakeReturns<D, A, M>;

export const makeMatch: MakeMatch = (discriminant) => (cases) =>
  matchOn(discriminant, cases);

export const match = makeMatch("_tag");
