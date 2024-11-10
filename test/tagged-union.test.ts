import { pipe } from "fp-ts/lib/function";
import {
  makeTaggedConstructors,
  MakeTaggedUnion,
  Member,
} from "../src/tagged-union";
import { match } from "../src";
import { expectTypeOf } from "expect-type";

const constructors = {
  Foo: () => ({}),
  Bar: (value: number) => ({ value }),
};
const TaggedUnion = makeTaggedConstructors(constructors);

describe("tagged-union", () => {
  it("plays nice with match", () => {
    const onBar = jest.fn(() => {});
    pipe(
      42,
      TaggedUnion.Bar,
      match({
        Bar: onBar,
      })
    );
    expect(onBar).toHaveBeenCalled();
  });

  describe("makeTaggedConstructors", () => {
    it("produces constructors that add the right tag", () => {
      expect(TaggedUnion.Bar(42)._tag).toBe("Bar");
      expect(TaggedUnion.Foo()._tag).toBe("Foo");
    });
  });

  describe("MakeTaggedUnion", () => {
    type ManuallyConstructedTaggedUnion =
      | { _tag: "Foo" }
      | { _tag: "Bar"; value: number };
    type TaggedUnion = MakeTaggedUnion<typeof constructors>;

    it("returns the correct type", () => {
      expectTypeOf<TaggedUnion>().toEqualTypeOf<ManuallyConstructedTaggedUnion>();
    });
  });

  describe("Member", () => {
    type TaggedUnion = MakeTaggedUnion<typeof constructors>;

    it("returns the type of the selected member including the tag", () => {
      expectTypeOf<Member<TaggedUnion, "Foo">>().toEqualTypeOf<{
        _tag: "Foo";
      }>();
      expectTypeOf<Member<TaggedUnion, "Bar">>().toEqualTypeOf<{
        _tag: "Bar";
        value: number;
      }>();
    });

    it.todo("prevents access to members that are not part of the tagged union");
  });

  describe("Values", () => {
    it.todo(
      "returns the type of the selected member's values excluding the tag"
    );
    it.todo("prevents access to members that are not part of the tagged union");
  });
  describe("MakeTaggedUnion", () => {
    it.todo("returns the correct type");
  });
});
