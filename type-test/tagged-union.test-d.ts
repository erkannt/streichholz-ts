import { expectAssignable, expectError, expectType } from "tsd";
import { makeTaggedConstructors, MakeTaggedUnion, Member } from "../dist";

const constructors = {
  Foo: () => ({}),
  Bar: (value: number) => ({ value }),
};

// makeTaggedConstructors return expected constructors with tagging
const mkTaggedUnion = makeTaggedConstructors(constructors);
expectType<() => { _tag: "Foo" }>(mkTaggedUnion["Foo"]);
expectAssignable<(value: number) => { _tag: "Bar"; value: number }>(
  mkTaggedUnion["Bar"]
);

// makeTaggedConstructors produces constructors that prevent invalid inputs
expectError(mkTaggedUnion["Foo"](42));
expectError(mkTaggedUnion["Bar"]("not a number"));

// access to non existent tag prevented at type level
type TaggedUnion = MakeTaggedUnion<typeof constructors>;
expectError((input: Member<TaggedUnion, "NotOneOfTheValidTags">) => {});
