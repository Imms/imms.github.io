Imms offers two set-like collections.
# [ImmSet](T:ImmSet'1)
The primary set-type collection. This is an unordered hash set. Membership is determined using an `IEqualityComparer` -- that is, using `GetHashCode()` and `.Equals` methods. You should use this collection unless element order is important for you.
# [ImmSortedSet](T:ImmSortedSet'1)
An ordered set that uses an `IComparer` to determine sort order and equality. Supports all of the functionality of `ImmSet`, plus special functionality unique to ordered collections, such as `MinItem`/`MaxItem` and retrieval by sort order index, among others.
	
Note that objects don't have a default ordering comparer, so you might have to supply one yourself.

Unordered sets tend to perform better because they use hash codes, which let the collection make fewer comparisons.
# Common operations
Both sets support many common operations.
## Single element set operations
Both sets support `Add`, `Remove`, and `Contains`, etc.
## Set-theoretic operations
The sets support set-theoretic operators, which include:
1. [Union](M:AbstractSet'2.Union)
2. [Intersection](M:AbstractSet'2.Intersect)
3. [Except](M:AbstractSet'2.Except)
4. [Symmetric difference](M:AbstractSet'2.Difference), often called simply `Difference`.
5. [ExceptInverse](M:AbstractSet'2.ExceptWith), which is the opposite of `Except`.

These operations take an `IEnumerable<T>`, which taken to be a collection of elements. The operations are performed using the current instance's membership semantics, even if the input is also a set with different membership semantics. Type testing is performed internally to determine the actual type of the input.

The input can contain duplicates. They are ignored.

These methods are highly optimized for *compatible* sets of the same type. See more about set compatiblity below. The methods are also optimized for other kinds of inputs. As always, iterators will give the worst performance.
## Set-theoretic relations
The sets support set-theoretic relation operators, including:
1. [`IsSubsetOf`](M:AbstractSet'2.IsSubsetOf) and related methods. These test for a specific relation.
2. [`RelatesTo`](M:AbstractSet'2.RelatesTo), which returns an enum value indicating the relation between two sets.

The input is an `IEnumerable<T>` here as well.
## Performance and Complexity
It's hard to measure set performance because it depends on many variables, like the element type and the comparer used. For operations like `Union`, the size of the input and target collections (and their types) are also very important.

Imms sets are implemented as AVL trees. This is a standard and time-honored data-structure for implementing immutable maps and sets. The sets and maps in the `System.Collections.Immutable` namespace also use such an implementation, and the `FSharp` set is implemented as a Red/Black tree, which is similar.
### Performance guarantee
However, Imms does make a pretty big performance guarantee: when you execute operations like `Union` between two compatible sets, the operation will perform relative to the size of the smaller set. In terms of algorithmic complexity, the performance of set-theoretic operations can be said to be the following:
$$ O\left(n\log \left(1 + {N \over n}\right)\right)$$

Where $N$ is the size of the larger set and $n$ is the size of the smaller set. This is strictly better than:
$$ O(\min\left(m+n, m \log n, n \log m\right))$$
Of course, if the input is a different kind of collection or an incompatible set, this performance guarantee can't really be made, and the best we can achieve is $m \left(\log n + \log m\right)$ or thereabouts (here $m$ is the input size).

This is a very useful performance guarantee to make, because it means operations between a large set and a small one take very little time at all. Other implementations don't make this guarantee, which can cause them be nany orders of magnitude slower and make some operations prohibitively expensive.
### Complexity
Here is a rundown of the complexity of each operation, which just showcases what we've discussed previously:

<div data-component="CmComplexityTable" data-props-table="sets">--[COMPLEXITY TABLE]--</div>

`ImmSet` and `ImmSortedSet` have the same time complexity per operation, with the exception that `ImmSet` is a hash set that uses buckets, and therefore the performance is averaged over the inputs, and assumes a decent `GetHashCode` implementation.
### Performance
The collections have been put through thorough benchmarking and compared against similar collections from other libraries. These results are from one benchmarking session, with a specific number of iterations and other parameters. However, the parameters between different tests and test groups are comparable.
#### Benchmarking Participants
Two different kinds of sets were tested: ordered sets and unordered hash sets. When dealing with strings and other complex data types, they will perform much better than ordered sets, since comparison operations are expensive.

1. **Ordered:** ImmSortedSet, System.ImmutableSortedSet, FSharp.Set*
2. **Unordered:** ImmSet, System.ImmutableSet

Note that `FSharp.Set` doesn't allow you to supply a custom comparison handler, and the default comparer for strings is an ordinal comparer (e.g. one where "Zzzz" appears before "aaaa"). Ordinal comparison is much cheaper than culture-sensitive lexicographic comparison, but isn't very useful for ordering strings, so whether `FSharp.Set` is an ordered set or not is debatable.

This is also the reason it performs so much better than other ordered sets in single element tests.

#### Benchmarking Parameters
Benchmarks were performed with string data types because they are often kept in sets and have good built-in hash functions and comparison algorithms, while not being trivial like integers.

In tests involving data sources, two kinds of data sources were tested: Compatible sets of the same type, and arrays. For `FSharp.Set`, which does not have set operations that accept a sequence, the sequence was first converted into a set.

The size of the input collection was 10 times the size of the target, to showcase set algorithm intelligence.

#### Results
<div data-component="CmChartSuite" data-props-suite="sets">--[PERFORMANCE CHARTS]--</div>