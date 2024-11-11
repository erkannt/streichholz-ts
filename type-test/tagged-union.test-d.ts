import { expectAssignable, expectError, expectType } from "tsd";
import { Member, TaggedUnion, toTaggedContructors } from "../src";

const constructors = {
  Foo: () => ({}),
  Bar: (value: number) => ({ value }),
};
type ExampleTaggedUnion = TaggedUnion<typeof constructors>;

// MakeTaggedUnion happy path
type ExpectedTaggedUnion = { _tag: "Foo" } | { _tag: "Bar"; value: number };
expectAssignable<(a: ExpectedTaggedUnion) => void>(
  (a: ExampleTaggedUnion) => {}
);

// Member happy path
expectAssignable<(a: Member<ExampleTaggedUnion, "Foo">) => void>(
  (a: { _tag: "Foo" }) => {}
);
expectAssignable<(a: Member<ExampleTaggedUnion, "Bar">) => void>(
  (a: { _tag: "Bar"; value: number }) => {}
);

// access to non existent tag prevented at type level
expectError((input: Member<ExampleTaggedUnion, "NotOneOfTheValidTags">) => {});

// any single member can be assigned to the union
expectAssignable<(input: Member<ExampleTaggedUnion, "Bar">) => void>(
  (input: ExampleTaggedUnion) => {}
);
expectAssignable<(input: Member<ExampleTaggedUnion, "Foo">) => void>(
  (input: ExampleTaggedUnion) => {}
);

// toTaggedConstructors return expected constructors with tagging
const mkTaggedUnion = toTaggedContructors(constructors);
expectType<() => { _tag: "Foo" }>(mkTaggedUnion["Foo"]);
expectAssignable<(value: number) => { _tag: "Bar"; value: number }>(
  mkTaggedUnion["Bar"]
);

// toTaggedConstructors produces constructors that prevent invalid inputs
expectError(mkTaggedUnion["Foo"](42));
expectError(mkTaggedUnion["Bar"]("not a number"));
