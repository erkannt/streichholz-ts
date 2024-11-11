import { pipe } from "fp-ts/lib/function";
import { toTaggedContructors } from "../src/tagged-union";
import { match } from "../src";

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
});
