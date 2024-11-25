import { expectAssignable, expectError, expectType } from "tsd";
import { Member, TaggedUnion, toTaggedContructors } from "../src";

const constructors = {
  Foo: () => ({}),
  Bar: (value: number) => ({ value }),
};
type ExampleTaggedUnion = TaggedUnion<typeof constructors>;

// MakeTaggedUnion happy path
type ExpectedTaggedUnion = { _tag: "Foo" } | { _tag: "Bar"; value: number };
declare const example: ExampleTaggedUnion
expectAssignable<ExpectedTaggedUnion>(example);

// Member happy path
declare const expectedFoo: {_tag: "Foo"}
declare const expectedBar: { _tag: "Bar"; value: number }
expectAssignable<Member<ExampleTaggedUnion, "Foo">>(expectedFoo);
expectAssignable<Member<ExampleTaggedUnion, "Bar">>(expectedBar);

// access to non existent tag prevented at type level
expectError((a: Member<ExampleTaggedUnion, "NotOneOfTheValidTags">) => {});

// any single member can be assigned to the union
expectAssignable<(input: Member<ExampleTaggedUnion, "Bar">) => void>(
  (input: ExampleTaggedUnion) => {}
);
expectAssignable<(input: Member<ExampleTaggedUnion, "Foo">) => void>(
  (input: ExampleTaggedUnion) => {}
);

// toTaggedConstructors return expected constructors with tagging
const constructMember = toTaggedContructors(constructors);
expectType<() => { _tag: "Foo" }>(constructMember["Foo"]);
expectAssignable<(value: number) => { _tag: "Bar"; value: number }>(
  constructMember["Bar"]
);

// toTaggedConstructors produces constructors that prevent invalid inputs
expectError(constructMember["Foo"](42));
expectError(constructMember["Bar"]("not a number"));
