Imms offers two map-like collections:
# [ImmMap](T:ImmMap'2)
The primary map-type collection. This is an unordered hash map. Uses an `IEqualityComparer` -- that is, using `GetHashCode()` and `.Equals` methods. You should use this collection unless element order is important for you.
# [ImmSortedMap](T:ImmSortedMap'2)
An ordered map that uses an `IComparer` to determine sort order and equality between keys. Supports all of the functionality of `ImmMap`, plus special functionality unique to ordered collections, such as `MinItem`/`MaxItem` and retrieval by sort order index, among others.

Note that objects don't have a default ordering comparer, so you might have to supply one yourself.

Unordered maps tend to perform better because they use hash codes, which let the collection make fewer comparisons.
# Common operations
Both maps support many common operations.
## Single element map operations
Both maps support `Add`, `Remove`, `Contains`, `Lookup`, etc.

`Add` comes in two flavors: `Add` and `Set`. The former throws an exception if the key already exists in the map, while the second overwrites its previous value.
## Map operators
Maps support analogs of set operators such as `Union` and `Intersect`. These are useful operations that allow you to combine two maps into one in different ways. Unlike standard set operators, map operators often allow you to supply a function to determine the value in the result map. In the absence of a function, the values in the input map usually overwrite those in the current map.

They are a rather unique feature, so I'll present each one with a bit of depth.
### Merge (Union)
This operation merges two maps. It combines their key-value pairs using the key semantics of the current map, returning a map including the key-value pairs of both. A selector can be supplied, which determines the value in case of collision. The function takes the key, the value in the current map, and in the value in the input map. This selector is called the join selector.
	
Without a selector, the value in the input map is used.
### Join (Intersection)
This operation joins two maps. It matches every key in the current map with every key in the input map. You can supply a selector that determines the value in the output. Otherwise, the value in the input map is used. This selector is called the join selector.
	
Without a selector, the value in the input map is used.
	
This operation is similar to the LINQ `join` operator.
### Subtract (Except)
This one subtracts the input map from the current map. A selector is applied on all the key-value pairs shared by the two maps. This selector returns an `Optional` value. If it is `Some(v)`, then the key-value pair is retained with the value `v`. Otherwise, if it is `None`, the key-value pair is removed. This selector is called the subtraction selector.
	
Without a selector, the key-value pair is simply removed.
### Difference (Difference)
This method returns a map consisting of all the key-value pairs in exactly one map. No selector can be supplied in this case.
### AddRange/SetRange
These methods act the same way as `Merge`, except that no special value selector is supplied. `AddRange` throws an exception on a collision and `SetRange` simply overwrites all the values with those of the input map.
### RemoveRange
This method takes a collection of keys and returns a map without any of those keys. It is optimized if the input is a compatible set.
	
Similarly to the set operators, the input for these operations is `IEnumerable<KeyValuePair<TKey, TValue>>` (or sometimes `IEnumerable<TKey>` or possibly `IEnumerable<KeyValuePair<TKey, TValue2>>` for some other type). Type testing is performed internally to check the collection type.

In case the input isn't a compatible set or map, duplicates in the input *do* matter. If a selector is supplied, it will be applied once for each duplicate as follows. Let's say that the map `{a: 1, b: 2}` is joined with `{a: 3, a : 4, a : 5}` with the selector `f(k,myValue,otherValue) = myValue + otherValue`. Then the selector will be invoked iteratively as follows:

1. `f(a, 1, 3) = 1 + 3 = 4`, and then:
2. `f(a, 4, 4) = 4 + 4 = 8`, and then:
3. `f(a, 8, 5) = 8 + 5 = 13`.

And the result will be: `{a: 13}`.

If a selector isn't supplied in this case, the result will be `{a: 5}`, since that is the last value that appears in the input for that key.
## Performance and Complexity
In Imms, maps and sets are implemented using exactly the same data structures, so their algorithmic complexity is the same. See the [set complexity section](/content/Sets#complexity) for more information. Much written there is also relevant to maps.

Operations such as `Union` are directly paralleled by `Merge` and others.
### Performance
Although Imms maps are implemented using the same data structures as sets, there are some differences in actual performance. In addition, it is important to compare them to other maps and dictionaries. 
#### Benchmarking Participants
Two different kinds of maps were tested: ordered maps and unordered hash maps. When dealing with strings and other complex data types, they will perform much better than ordered maps, since comparison operations are expensive.
1. **Ordered:** ImmSortedMap, System.ImmutableSortedDictionary, FSharp.Map*
2. **Unordered:** ImmMap, System.ImmutableDictionary

Note that `FSharp.Map` doesn't allow you to supply a custom comparison handler, and the default comparer for strings is an ordinal comparer (e.g. one where "Zzzz" appears before "aaaa"). Ordinal comparison is much cheaper than culture-sensitive lexicographic comparison, but isn't very useful for ordering strings, so whether `FSharp.Map` is an ordered set or not is debatable.

This is also the reason it performs so much better than other ordered sets in single element tests.
#### Benchmarking Parameters
Benchmarks were performed with string data types because they are often kept in sets and have good built-in hash functions and comparison algorithms, while not being trivial like integers.
#### Results
<div data-component="CmChartSuite" data-props-suite="maps">--[PERFORMANCE CHARTS]--</div>