## The pattern matching library of my dreams

Bucket list of dreams:

- [x] plays nice with fp-ts pipes
- [x] exhaustiveness check by compiler
- partial matching with a default case
- ~~tag field for matching against tagged union can be passed as an optional argument~~ (not possible as generics can't have defaults)
- [ ] filter to subset of a tagged union
- [x] cond that matches against first true condition
- [ ] generate constructors to hide tag field
- [ ] easy matching against a union of literal or other values

## Alternatives

- [ts-adt](https://github.com/pfgray/ts-adt)
- [ts-pattern](https://github.com/gvergnaud/ts-pattern)
- [disc-union](https://github.com/BobbyGerace/disc-union)
- [variant](https://github.com/paarthenon/variant)
