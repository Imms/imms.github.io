---
layout: main
styles:
  - documentation.css

---

# API Overview

## API Gotchas
Every library has a small set of 'gotchas'. Somewhat surprising things that will catch new users off-guard.

1. Collections support negative indexing (see sections below). This means that things that used to throw exceptions can instead cause unexpected behavior.

2. The collections overload arithmetic operators.

2. `Length` returns the length of a collection, not `Count`. `Count` is instead a method that counts the number of items in the collection, like the LINQ method which it overrides.

3. Collections don't have visible constructors. You must construct them using factory methods, e.g. `ImmList.Empty<int>()` or from other collections.

4. `AddLast`/`AddFirst` add items to sequential collections, not `Add` alone. The same with `Remove`.

5. The collections 'override' LINQ operations, and these overriding operations return collections of the same kind as the original. To use the original LINQ operations (which are lazy and return `IEnumerable`), use `AsEnumerable`.

5. The `==` operator, the `.Equals` method, and the `.GetHashCode` method are overridden only for sequential collections, for which the default equality comparer is used. In addition, for two such collections to be equal, they must be of the same type.

If Imms decides that the comparison handlers are different, a generic implementation will be used, which can be significantly slower. That is to say, the implementation is as slow as what some other collection libraries use.

### F# Companion Library
1. F# option type is not the same as Imms's `Optional` type.

2. Instance methods exposed by collections often take parameters of type `Func<T>`, which isn't directly compatible with F#'s function objects. To get around this, use the module bindings.

3. Some constructs in the `Imms.FSharp.Implementation` namespace are accessible, but are not meant to be used in user code, and aren't supported.

### Note about Maps and Sets
The set and map collections in this library support custom equality and comparison semantics (by accepting an `IComparer<T>` or `IEqualityComparer<T>`). This isn't as trivial as it sounds.

Remember that these collections use special algorithms for operations such as `Intersect` and `Union`. These algorithms only make sense when both collections are compatible, i.e. use the same equality or comparison semantics. Otherwise, the result will be corrupted.

To avoid dangerous and hard to track bugs, Imms collections only use the special algorithms if both collections use the same equi/comp handler. This is determined by calling `.Equals`. For this reason, if you plan to use a custom handler, you should either:

1. Make sure to use the same handler instance for all Imms collections that use that handler. This pattern is made more convenient by extension methods on handlers that lets you use them as 'factories' of collections. An example is `IComparer<T>.CreateSortedSet`.

2. Override `.Equals` on your custom handler to support functional equality.


## Constructing collections
Each Imms collection has a corresponding static helper class with the same name. For example, [`ImmList<T>`](T:ImmList'1) has [`ImmList`](T:ImmList). These classes provide methods for constructing new collections.

```csharp
//create an empty collection of the specific type:
var empty = ImmList.Empty<int>();

//create a collection from a param array:
var of = ImmList.Of(1, 2, 3);

//create a collection from another (using an extension method):
var immList = new[] {1, 2, 3}.ToImmList();
```

## Operators
Imms collections meaningfully overload operators, in a manner similar to strings.
 
### Plus operator
 
The `+` operator can be used to add one or more elements to a collection, or concatenate two collections, such as in these example:

```csharp 
var list = ImmList.Of(1, 2) + ImmList.Of(3, 4) + new[] {5, 6, 7};
var set = ImmSet.Of(1, 2) + ImmSet.Of(3, 4) + new[] {5, 6, 7};
```

This is possible from both sides in the case of double-ended collections. In the case of most collections, the collection must be on the left-hand side.

Maps/dictionaries also support adding elements, the elements being key-value pairs. The key-value pairs overwrite any existing ones.

```csharp
var map = ImmMap.Of(Kvp.Of(1, 1), Kvp.Of(2, 2)) + Kvp.Of(3, 3) + new[] {Kvp.Of(3, 4), Kvp.Of(1, 2)};
```
### Minus operator
You can use the `-` operator to remove elements from sets or keys from key-value maps. Note using it never raises an error.

```csharp
var set = ImmSet.Of(1, 2, 3) - 1 - 2;
```
Multiple keys are also supported:

```csharp	
var set = ImmSet.Of(1, 2, 3) - new[] {1, 2};
var map = ImmMap.Of(Kvp.Of(1, 1), Kvp.Of(2, 2), Kvp.Of(3, 3)) - new[] {1, 2};
```

### Equals operator
The `==` operator is overloaded for sequential collections only, for those uses the default equality comparer for the element type. The same goes for the `Equals` method.

The reason for this being, that sets and maps have configurable membership semantics (e.g. an ordering or equality function), and two sets with different membership semantics can't be compared in a consistent and intuitive manner.

### Other operators
Logical operators are overloaded for sets and maps to support operations between two collections.

```csharp
var set1 = ImmSet.Of(1, 2, 3);
var set2 = ImmSet.Of(3, 4, 5);

var intersection = set1 & set2;
var symmetricDifference = set1 ^ set2;
```

## Indexing

### Negative indexing
An important feature of Imms is negative indexing. Negative indexing is a feature present in some languages such as Python and PHP. It lets you pass a negative index to a collection to denote distance from the end. In this system, `-1` denotes the last index, `-2` the one before that, and so forth. 

In particular, `-Length` points to the first item in the collection.

You can pass a negative index wherever you can pass any kind of index, including `CopyTo`, `this[int]`, and others. You can't pass negative numbers to methods like `Take` because they expect a *count* rather than an *index*.

Negative indexing is particularly helpful when slicing a collection. For example, `this[0, -4]` returns the collection minus the last 3 items, while `this[-4, -2]` returns a slice consisting of the 4th, 3rd, and 2nd items from the end.

### Sort order indexing
For sorted collections, such as `ImmSortedSet` and `ImmSortedMap`, you can retrieve items by their index in the sort order using the method `ByOrder(int index)`. `ByOrder(0)` corresponds to the minimum and `ByOrder(-1)` corresponds to the maximum.

### Slices
For sequential collections, you can retrieve a slice of the collection using the indexer `this[int start, int end]`. For example, `ImmList.Of(1, 2, 3)[0, 1]` returns a list consisting of the first two elements.

For sets and maps, you can instead use the `Slice(TKey start, TKey end)` method, which returns a slice of the collection with keys between `start` and `end`. They keys themselves don't have to be part of the collection, but they are included if they are.

## Imms LINQ API
As mentioned previously, Imms overrides the standard LINQ API, so that LINQ operations on Imms collections return collections of the same kind. This is very convenient and useful, and plus can perform much better than using LINQ, since iteration is performed directly rather than using an enumerator (which creates undue overhead in immutable collections.

In order to use standard LINQ operations, use `AsEnumerable` or cast the collection to an `IEnumerable<T>`.

The following query for example is executed entirely using the Imms LINQ API:

```csharp
ImmList<string> names = new[] {
	"Bob", "Frank", "Joe", "Steve", "Allen", "Greg", "Mike", "Joey", "Jill", "Marcus", "Alex"
}.ToImmList();

string[] names2 = new[] {
	"Bob", "Alex", "Jill", "Fred", "Linda"
};

ImmList<KeyValuePair<char, IEnumerable<string>>> namesByFirstLetter =
	from name in names
	where !name.StartsWith("M")
	let firstLetter = name[0]
	group name by firstLetter into namesByThisLetter
	orderby namesByThisLetter.Key
	select namesByThisLetter;

ImmList<string> peopleInBothLists =
	from name in names
	join name2 in names2 on name equals name2
	orderby name
	select name;
```
In addition to the above, Imms provides various other LINQ methods, such as `Any`, `Aggregate`, `Count`, and others.

Imms LINQ is currently implemented mainly for sequential collections, maps and sets having no support (except for operations like `Any` that don't return collections).

In the future, Imms collections will be better integrated into this LINQ API, such as the `group ... by` clause returning a map (or maybe a multi-map) instead of a list of key-value pairs.

### Limitations

#### Ordering by multiple keys
The `orderby` keyword isn't supported with multiple keys. To order data by multiple keys, use a single tuple key:

```csharp
var orderedNames = 
	from name in names
	//order first by name length and then alphabetically:
	orderby Tuple.Create(name.Length, name) 
	select name;
```

Alternatively, use multiple `orderby` clauses. Order by the least important key first. This is much less efficient, however.

```csharp
var orderedNams = 
	from name in names
	//order the collection alphabetically
	//and then re-order it by name length.
	orderby name
	orderby name.Length
	select name;
```

Ordering with multiple keys is implemented in a very inconvenient way, and is unlikely to ever be supported.

### New methods
In addition to the standard LINQ methods, a few interesting additional methods are implemented. Here are some examples. Full information can be found in the reference documentation.

#### Scan
An operation that is similar to `Aggregate`, but returns a collection consisting of the partial results.
	
#### Select optional
This is similar to the `Select` projection and can be used in a query expression. The element projection function returns an [`Optional<S>`](/pages/optional) value, and returns a collection with element type `S`. Only `Some` values are retained in the result.

## Compatibility features
Imms collections implement various interfaces such as `IList<T>` and others for the sake of compatibility. Other examples of implemented interfaces include: `IReadOnlyList<T>`, and `IList`. Note that mutable collection interfaces throw exceptions when mutation is attempted, which is standard behavior for read-only collections in .NET.
