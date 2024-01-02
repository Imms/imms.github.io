ImmSet is an immutable hash set, implemented as an AVL tree, and it’s the library’s primary set collection. Elements must [[Key Semantics|normally]] implement `IEquatable<T>`.

It also has a [sorted](T:ImmSortedSet’1) variant that uses `IComparer<T>` and `IComparable<T>`.

> [!hint] Examples
> [See some code!](https://replit.com/@GregRos/ImmsSandbox#collections/set.cs)
# Operators
ImmSet supports the basic membership, addition, and removal operations. It also supports highly optimized set-theoretic operations. See [[Key Semantics]] when collections with custom comparison logic are involved.

1. [Union](M:AbstractSet'2.Union)
2. [Intersection](M:AbstractSet'2.Intersect)
3. [Except](M:AbstractSet'2.Except)
4. [Symmetric difference](M:AbstractSet'2.Difference), often called simply `Difference`.
5. [ExceptInverse](M:AbstractSet'2.ExceptWith), which is the opposite of `Except`.

These operations take an `IEnumerable<T>`, which taken to be a collection of elements. The operations are performed using the current instance's membership semantics, even if the input is also a set with different membership semantics. Type testing is performed internally to determine the actual type of the input.

The input can contain duplicates. They are ignored.

These methods are highly optimized for *compatible* sets of the same type. See more about set compatiblity below. The methods are also optimized for other kinds of inputs. As always, iterators will give the worst performance.
# Relations
The sets support set-theoretic relation operators, including:
1. [`IsSubsetOf`](M:AbstractSet'2.IsSubsetOf) and related methods. These test for a specific relation.
2. [`RelatesTo`](M:AbstractSet'2.RelatesTo), which returns an enum value indicating the relation between two sets.

The input is an `IEnumerable<T>` here as well.
# Complexity
Here is a rundown of the complexity of each operation, which just showcases what we've discussed previously:

![[Sets_Complexity.png]]

`ImmSet` and `ImmSortedSet` have the same time complexity per operation, with the exception that `ImmSet` is a hash set that uses buckets, and therefore the performance is averaged over the inputs, and assumes a decent `GetHashCode` implementation.
# Performance

![[Bench_Sets_Single.png]]
![[Bench_Set_Operators.png]]
![[Bench_Set_Iterate.png]]