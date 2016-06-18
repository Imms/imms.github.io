---
layout: main
styles:
  - documentation.css

---
# Sequential
This page talks about operations common to the set-like collections.
There are two sets: one unordered hash set () and one ordered set ([ImmSortedSet](T:ImmSortedSet'1)).
## Kinds of collections
Imms offers two sequential collections:

1. ### [ImmSet](T:ImmSet'1)
	The primary set-type collection. This is an unordered hash set. Membership is determined using an `IEqualityComparer` -- that is, using `GetHashCode()` and `.Equals` methods. You should use this collection unless element order is important for you.
	
2. ### [ImmSortedSet](T:ImmSortedSet'1)
	An ordered set that uses an `IComparer` to determine sort order and equality. Supports all of the functionality of `ImmSet`, plus special functionality unique to ordered collections, such as `MinItem`/`MaxItem` and retrieval by sort order index.

Unordered sets tend to perform better because they use hash codes, which let the collection make fewer comparisons.

## Kinds of Operations
Note that all index parameters may be negative, indicating position from the end.

### Single element operations
Both sets support `Add`, `Remove`, and `Contains`. 

In addition, `ImmSortedSet` supports `MinItem`, `MaxItem`, and `ByIndex`.

### Slices
`ImmSortedSet` supports slices between two keys.

### Set-theoretic operations
Sets support set-theoretic operations, which include:

1. Union
2. Intersection
3. Except
4. Symmetric difference

### Set-theoretic relations
Sets support several methods for determining the set-theoretic relation between two sets, including:

1. `IsSubsetOf` and related methods.
2. `RelatesTo`, which returns an enum value.

## Performance and Complexity
Imms collections have been turned for extremely high performance and have many optimizations for bulk operations (adding or removing many items at the same time) that allow them to sidestep the overhead imposed by immutability in these circumstances.

Similar optimizations will enable creating high-performance mutable collection builders in the future.

### Complexity
The computational complexity of Imms sequential collections and comparable non-Imms collections can be seen below.
<div class="react-complexity-table" data-table="sequentials">--[COMPLEXITY TABLE]--</div>

### Performance
The collections have been put through thorough benchmarking and compared against similar collections from other libraries. These results are from one benchmarking session, with a specific number of iterations and other parameters. However, the parameters between different tests and test groups are comparable.

For example, the `AddLast` benchmark might've been executed for 100,000 iterations, while the `AddLastRange` benchmark might've been executed with input datasets of 10,000 elements 10 times.

<div class="react-chart-suite" data-suite="sequentials">--[PERFORMANCE CHARTS]--</div>