import { pipe } from "fp-ts/lib/function";

type Union<
  T extends Record<string, (...args: any[]) => Record<string, unknown>>
> = {
  [K in keyof T]: { _tag: K } & ReturnType<T[K]>;
}[keyof T];

type Member<T extends { _tag: string }, K extends T["_tag"]> = T & { _tag: K };

type Values<T extends { _tag: string }> = Omit<T, "_tag">;

const FooOrBar = {
  Foo: () => ({}),
  Bar: (value: number) => ({ value }),
};

type FooOrBar = Union<typeof FooOrBar>;
type Bar = Member<FooOrBar, 'Bar'>;
type BarValues = Values<Bar>;

const bar = pipe(42, FooOrBar.Bar);
