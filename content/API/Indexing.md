Imms has several variations for indexing.
# Negative Indexing
Imms collections support negative indexing, a feature borrowed from other languages such as Python. In this system, `-1` denotes the last index, `-2` the one before that, and so forth. 

You can pass a negative index wherever you can pass any kind of index, including `CopyTo`, `this[int]`, and others. You can't pass negative numbers to methods like `Take` because they expect a *count* rather than an *index*.

Negative indexing is particularly helpful when slicing a collection. For example, `this[0, -4]` returns the collection minus the last 3 items, while `this[-4, -2]` returns a slice consisting of the 4th, 3rd, and 2nd items from the end.
# Sort order indexing
For sorted collections, such as `ImmSortedSet` and `ImmSortedMap`, you can retrieve items by their index in the sort order using the method `ByOrder(int index)`. `ByOrder(0)` corresponds to the minimum and `ByOrder(-1)` corresponds to the maximum.
# Slices
For sequential collections, you can retrieve a slice of the collection using the indexer `this[int start, int end]`. For example, `ImmList.Of(1, 2, 3)[0, 1]` returns a list consisting of the first two elements.

For sets and maps, you can instead use the `Slice(TKey start, TKey end)` method, which returns a slice of the collection with keys between `start` and `end`. They keys themselves don't have to be part of the collection, but they are included if they are.