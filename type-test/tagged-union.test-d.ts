import { expectError } from "tsd";
import { MakeTaggedUnion, Member } from "../dist";

const constructors = {
  Foo: () => ({}),
  Bar: (value: number) => ({ value }),
};

type TaggedUnion = MakeTaggedUnion<typeof constructors>;

expectError((input: Member<TaggedUnion, "NotOneOfTheValidTags">) => {});
