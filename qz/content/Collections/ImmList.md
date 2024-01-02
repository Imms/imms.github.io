> [!hint] Examples
> [See some code!](https://replit.com/@GregRos/ImmsSandbox#collections/list.cs)

Imms offers a single sequential collection, [ImmList](T:ImmList’1). It’s the flagship collection of the library, with support for a large variety of useful operations, optimal time complexities, and blazing fast real-world performance.
# Ends
Supports $O(1)$ access to the ends via `AddLast` and `AddFirst`.
# Bulk
Supports optimized bulk operations for adding multiple elements.
# Indexing
Fast $O(\log n)$ lookup, update, insert, and remove.
# Complexity
The computational complexity of Imms sequential collections and comparable non-Imms collections can be seen below.
![[List_Complexity.png]]
# Performance
The collections have been put through thorough benchmarking and compared against similar collections from other libraries. These results are from one benchmarking session, with a specific number of iterations and other parameters. However, the parameters between different tests and test groups are comparable.

For example, the `AddLast` benchmark might've been executed for 100,000 iterations, while the `AddLastRange` benchmark might've been executed with input datasets of 10,000 elements 10 times.
 ![[Bench_List_SingleItem.png]]![[Bench_List_Bulk.png]]![[Bench_List_Slices.png]]![[Bench_List_Lookups.png]]![[Bench_List_Iteration.png]]![[Bench_List_Indexing.png]]

