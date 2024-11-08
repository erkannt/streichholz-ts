import { pipe } from "fp-ts/lib/function";
import * as R from "fp-ts/Record";

type MakeTaggedUnion<
  T extends Record<string, (...args: any[]) => Record<string, unknown>>
> = {
  [K in keyof T]: { _tag: K } & ReturnType<T[K]>;
}[keyof T];

type TaggedConstructors<
  T extends Record<string, (...args: any[]) => Record<string, unknown>>
> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<T[K]> & { _tag: K };
};

type Member<T extends { _tag: string }, K extends T["_tag"]> = T & { _tag: K };

type Values<T extends { _tag: string }> = Omit<T, "_tag">;

declare function makeTaggedConstructors<
  A extends Record<string, (...args: any[]) => Record<string, unknown>>
>(taglessConstructors: A): TaggedConstructors<A>;

const constructors = {
  Foo: () => ({}),
  Bar: (value: number) => ({ value }),
};

const FooOrBar = makeTaggedConstructors(constructors);
type FooOrBar = MakeTaggedUnion<typeof constructors>;

type Bar = Member<FooOrBar, "Bar">;
type BarValues = Values<Bar>;

const bar: Bar = pipe(42, FooOrBar.Bar);
