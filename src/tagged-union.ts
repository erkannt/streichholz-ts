import { flow, pipe } from "fp-ts/lib/function";
import * as R from "fp-ts/Record";

export type TaggedUnion<
  T extends Record<string, (...args: any[]) => Record<string, unknown>>
> = {
  [K in keyof T]: { _tag: K } & ReturnType<T[K]>;
}[keyof T];

type TaggedConstructors<
  T extends Record<string, (...args: any[]) => Record<string, unknown>>
> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => ReturnType<T[K]> & { _tag: K };
};

export type Member<T extends { _tag: string }, K extends T["_tag"]> = T & {
  _tag: K;
};

export const toTaggedContructors = <
  A extends Record<string, (...args: any[]) => Record<string, unknown>>
>(
  taglessConstructors: A
): TaggedConstructors<A> =>
  pipe(
    taglessConstructors,
    R.mapWithIndex((key, constructor) =>
      flow(constructor, (partial) => ({ ...partial, _tag: key }))
    ),
    (taggedContructors) => taggedContructors as unknown as TaggedConstructors<A>
  );
