import { pipe } from "fp-ts/lib/function";
import { makeTaggedConstructors } from "../src/tagged-union";
import { match } from "../src";

describe("tagged-union", () => {
  it("plays nice with match", () => {
    const constructors = {
      Foo: () => ({}),
      Bar: (value: number) => ({ value }),
    };
    const onBar = jest.fn(() => {});
    const TaggedUnion = makeTaggedConstructors(constructors);
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
    it.todo("produces constructors that add the right tag");
    it.todo(
      "produces constructors that enforce passing valid input to the selected constructor"
    );
  });
  describe("MakeTaggedUnion", () => {
    it.todo("returns the correct type");
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
