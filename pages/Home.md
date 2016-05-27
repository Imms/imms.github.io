---
layout: main
styles:
  - landing.css

---

# Imms
Imms is a powerful, high-performance library of immutable and persistent collections for the .NET Framework. It's the best of its kind.

It also has a number of additional, highly useful features, such as an Optional type.

* [What's an immutable and persistent collection?](/pages/immutable)
* [What should I use it for?](/pages/immutableUses)
* [Why choose Imms?](/pages/features)

Currently, Imms requires .NET Framework version 4.5. In the future, versions for 4.0 and 3.5 will also be compiled.

## Overview
Imms contains 6 basic collection types, which may be used to create other, more specialized collections.

1. ### ImmList
    Similar to `List<T>`, but with a lot more functionality.

	A flexible and high-performance double-ended queue, which also supports pretty much every operation you can name, such as fast splitting and concatenation, insertion and removal at an index, and more.

2. ### ImmVector
    Also similar to `List<T>`.

    A more limited but higher-performance vector-type collection.

3. ### ImmSet
	Similar to `HashSet<T>`.

    A hash set. Supports fast set-theoretic operations and relations, such as `IsSupersetOf` and `Union`.

4. ### ImmMap
	Similar to `Dictionary<TKey, TValue>`.

    A key-value hash map or dictionary. Supports lookup and update by key, as well as advanced operations, such as merging and joining two maps.

5. ### ImmSortedSet
	A sorted version of `ImmSet`. Supports additional operations such as `ByIndex`, `MaxItem`, and `Slice` (from key to key).

6. ### ImmSortedMap
	A sorted version of `ImmMap`. Supports additional operations, such as `ByIndex`, `MaxItem`, and more.

Examples of specialized collections that can be created using the above include priority queues, multi-maps, multi-sets, and graphs. These *may* be added to the library in the future (maybe [you could be the one to add them](/pages/extension/specialized))

## Examples
Here is a bit of code to give you a feel for Imms and its collections.

```csharp
ImmList<int> immList1 = ImmList.Of(1, 2, 3, 4, 5);
ImmList<int> immList2 = 
	 immList.AddLast(6).AddFirst(0)
	.AddLastRange(new[] {7, 8, 9});

//note that immList2 is a superlist of immList1.
ImmList<int> immList3 = immList1.AddLastList(immList2);

ImmSet<int> immSet1 = ImmSet.Of(1, 2, 3);
ImmSet<int> immSet2 = immSet1.Add(4);
bool contains3 = immSet2[4];
bool isSuperset = immSet2.IsSupersetOf(immSet1);

ImmSet<int> immSet3 = immSet1.Union(immSet2);

//Kvp.Of is a small helper method that creates a KeyValuePair.
ImmMap<int, int> immMap1 = 
	ImmMap.Of(Kvp.Of(1, 1), Kvp.Of(2, 2), Kvp.Of(3, 3));

ImmMap<int, int> immMap2 = 
	immMap1.Add(4, 4).Add(5, 5);

```

## Getting Started
Getting started is really easy. Just [get Imms](/pages/getImms) in whatever form you prefer, reference it from your project, and start coding. Imms has no dependencies.

## Documentation
**Be sure to check out the [API Gotchas](/pages/docs/gotchas) page!** It contains a quick rundown of the library's more surprising features and limitations.

Imms is (almost) fully documented in a few different ways. Hopefully, they will be better integrated in the future.

This site is the primary source of documentation and has a lot of information, including a rundown of the library's features, overview of each of the collections, explanations of what some of the operations do, as well as performance information. See the [Documentation](/pages/docs) section for more info.

The library's public API (and some of the internal stuff too) is documented using XML Doc, so you have a lot of information available to you in your IDE.

You can also consult the [API Reference](/API/index.html) section, which contains the API documentation generated using [Sandcastle]({{ site.data.links.sandCastle}}).

**Note that due to technical reasons, performance information isn't available in the API documentation, so you'll have to look up the [Performance](/pages/performance) section for info about that.**