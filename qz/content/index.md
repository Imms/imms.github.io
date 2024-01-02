> [!warning] Last updated 2016

High-performance immutable collections for .NET. [Try them!](https://replit.com/@GregRos/ImmsSandbox#collections/mixed.cs)
> [!success] Features
> > [!tip] 🤹 Five immutable collections!
> 
> > [!tip] 💎 Uniform and full-featured API!
> 
> > [!tip] 🚀 Aggressively optimized!
> 
> > [!tip] 💯 Fully tested and documented!
> 
# [[ImmList]]
Similar to `List<T>`. The flagship collection of the library. Supports a large variety of operations with lightning-fast performance and optimal time complexity.
# [[ImmSet|ImmSet]]
A hash set similar to `HashSet<T>`. Supports fast set-theoretic operations and relations. Has a [sorted](T:ImmSortedSet'1) variant.
# [[ImmMap|ImmMap]]
A hash map similar to `Dictionary<K, V>`. Supports unique map operations, such as join, difference, and exclude. Has a [sorted](T:ImmSortedMap'2) variant.
# API
Imms collections come with a carefully designed, uniform API.

> [!success] Optional
> An [[optional]] type that supports many of the library’s features.

> [!success] Helper classes
> Create instances of collections using [[helper]] classes

> [!success] Indexing
> Supports negative [[indexing]] and slices using indexers.

> [!success] PowerLINQ
> PowerLINQ overrides standard LINQ operators with high-performance, strongly-typed implementations.

> [!success] Operators
> Meaningfully overloads [[Operators]]

> [!success] F# Integration
> Get [[FSharp Integration|F# Integration]] for custom active patterns, operators, and modules.
