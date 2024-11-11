import { pipe } from "fp-ts/lib/function";
import { toTaggedContructors, Member, TaggedUnion } from "../src/tagged-union";
import { match } from "../src";
import { expectTypeOf } from "expect-type";

const exampleConstructors = {
  Foo: () => ({}),
  Bar: (value: number) => ({ value }),
};
const mkExampleTaggedUnion = toTaggedContructors(exampleConstructors);

describe("tagged-union", () => {
  it("plays nice with match", () => {
    const onBar = jest.fn(() => {});
    pipe(
      42,
      mkExampleTaggedUnion.Bar,
      match({
        Bar: onBar,
      })
    );
    expect(onBar).toHaveBeenCalled();
  });

  describe("makeTaggedConstructors", () => {
    it("produces constructors that add the right tag", () => {
      expect(mkExampleTaggedUnion.Bar(42)._tag).toBe("Bar");
      expect(mkExampleTaggedUnion.Foo()._tag).toBe("Foo");
    });
  });

  describe("MakeTaggedUnion", () => {
    type ExpectedTaggedUnion = { _tag: "Foo" } | { _tag: "Bar"; value: number };
    type ExampleTaggedUnion = TaggedUnion<typeof exampleConstructors>;

    it("returns the correct type", () => {
      expectTypeOf<ExampleTaggedUnion>().toEqualTypeOf<ExpectedTaggedUnion>();
    });
  });

  describe("Member", () => {
    type ExampleTaggedUnion = TaggedUnion<typeof exampleConstructors>;

    it("returns the type of the selected member including the tag", () => {
      expectTypeOf<Member<ExampleTaggedUnion, "Foo">>().toEqualTypeOf<{
        _tag: "Foo";
      }>();
      expectTypeOf<Member<ExampleTaggedUnion, "Bar">>().toEqualTypeOf<{
        _tag: "Bar";
        value: number;
      }>();
    });
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
