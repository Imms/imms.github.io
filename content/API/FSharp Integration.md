Imms is written primarily in C# and targets that language. But the library has a separate companion assembly, `Imms.FSharp`, that provides various extensions and modules for use with F#.

The following are the components of the F# Integration library.
## Common Aliases
The Imms library provides aliases for many collection-related types found in the .NET Framework, to better match F#'s concise style. Examples include:

1. `Kvp<'k,'v>` for `KeyValuePair<'TKey, 'TValue>`.
2. `IEq<'a>` for `IEqualityComparer<'T>`.
3. `ICmp<'a>` for `IComparer<'T>`
4. `IIter<'a>` for `IEnumerator<'T>`
## Module bindings
The F# companion library offers a module for each of the Imms collections, with module bindings for all the operations exposed by the standard interface. These modules also handle a few other things to make the collections more convenient to work with:
1. Conversion to and from F#'s function and `Option` types, as required.
2. Provide a few extra functions to match the spirit of the F# collection library.
3. Impose `: equality` and `: comparison` constraints, as required.
4. Provide conversion to and from F# collection types.
## Active Patterns
The F# companion library comes with a powerful set of active patterns for decomposing Imms sequential collections:

1. `Last(initial, last)` allows decomposing collections from the end. Examples are `Last1(initial, last)`, `Last2(initial, last1, last2)`, etc.
2. `First(head, tail)` allows decomposing collections from the beginning.
3. `Mid(head, mid, last)` allows decomposing a collection by one element from each side.
4. `Nil` matches an empty collection.
## Collection Expressions
The F# library also provides computation expressions for building Imms collections. Here are some examples of how they are used:

```fsharp
let lst = immList {
	for i in 0 .. 10 do yield i
}

let map = immMap {
	for i in 0 .. 10 do yield Kvp(i, i)
}
```
