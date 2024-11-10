import { pipe } from "fp-ts/lib/function";
import { makeTaggedConstructors, MakeTaggedUnion } from "../src/tagged-union";
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
    it.todo("returns the correct type");

    it("produces constructors that add the right tag", () => {
      expect(TaggedUnion.Bar(42)._tag).toBe("Bar");
      expect(TaggedUnion.Foo()._tag).toBe("Foo");
    });

    it.todo(
      "produces constructors that enforce passing valid input to the selected constructor"
    );
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
    it.todo("returns the type of the selected member including the tag");
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
    it.todo("any single member satisfies the tagged union");
  });
});
