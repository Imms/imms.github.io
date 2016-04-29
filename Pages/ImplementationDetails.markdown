---
layout: page

title:  "Rich API"

---
Imms collections offer a very rich and powerful API. This page describes it in general terms.

## Indexing
Many Imms collections support indexing and indexed operations. These come in a variety of forms, such as [`ImmList.Insert`](M:ImmList'1.Insert). They share a few things in common

### Sort Order Indexing
Sorted collections support sort order indexing, which allows you to look up items based on their position in the sort order. This is achieved using methods such as [`ByOrder`](M:ImmSortedSet'1.ByOrder).

```csharp
ImmSortedSet<int> set = ImmSortedSet.FromItems(1, 2, 3);
int second = set.ByOrder(1);
```

### Negative Indexing
All operations that accept an index support negative indexing. Examples include [`ImmList.Insert`](M:ImmList'1.Insert), [`ImmVector[int]`](P:AbstractSequential'2.Item(Int32)), and [`ImmSortedSet.ByOrder`](M:ImmSortedSet'1.ByOrder).

Basically, when the index is negative, it's taken to mean the distance from the end of the collection (or, "nth from the right"). This is a feature from Python that I really like, so I decided to include it.

Here are some examples:

```csharp
ImmList<int> list = Enumerable.Range(0, 100).ToImmList();

//instead of writing
int last = list[list.Length - 1];

//you just write:
int last = list[-1]; 

//the first index would be:
int first = list[-list.Length];
```

You can use this feature in slices as well. You can mix and match negative and positive indexes freely:

```csharp
//this returns a slice without the first and last elements:
ImmList<int> slice = list[1, -2]; 

//This one skips the last 9 elements:
ImmList<int> slice2 = list[0, -10];
```
On the other hand, Imms methods (for example, [`FindIndex`](M:AbstractSequential'2.FindIndex)) never return negative indexes.

In addition, `count` parameters cannot be negative. Such parameters appear in [`Take`](M:AbstractSequential'2.Take) and [`Skip`](M:AbstractSequential'2.Skip) for example:

```csharp
//Take accepts a *count*, not an *index*, so this is invalid and throws an exception:
ImmList<int> slice = list.Take(-1); 

//The same with Skip:
ImmList<int> slice2 = list.Skip(-1);
```

As a consequence of this, certain kinds of bugs will go unnoticed 

## Slicers

Imms sequential collections support slicers. Slicers are indexers that take two indexes and return a slice of the collection, such as [this[int,int]](P:AbstractSequential'2.Item(Int32,Int32)). All collections that support slicers are optimized for them. `ImmList` in particular provides instantaneous slicers.

```csharp
ImmList<int> list = Enumerable.Range(0, 100).ToImmList();

//first 11 elements
ImmList<int> slice1 = list[0, 10];
```
Slicers are very fast operations, especially in the case of `ImmList`. They are implemented using specialized algorithms.

### Key Slicers
Imms sorted collections, such as [`ImmSortedSet`](T:ImmSortedSet'1) and [`ImmSortedMap`](T:ImmSortedMap'2), instead support key slicers. 

Key slicers appear as methods such as [`Slice`](M:ImmSortedSet'1.Slice), rather than indexers.

A key slicer is like a regular slicer, except that instead of indexes it takes two keys (or set elements): a minimum key and a maximum key. The keys don't have to be members of the set or map, but they must take part in the same ordering.

The key slicer returns a subset (or submap) of elements that lie between the two keys, including the bounds, if they exist. Both parameters are optional, so you can specify only a minimum key or only a maximum key (or neither, for that matter, though this just returns the collection you started with). 

Here is an example:

```csharp
ImmSortedSet<int> set = 
    Enumerable.Range(0, 100) //all numbers between 0 and 99
    .Where(x => x % 2 == 0) //take only the even ones
    .ToImmSortedSet(); //convert to a sorted set
    
//The set doesn't contain the item '1', but you can still use it as a lower bound, excluding 0 from the set: 
var without0 = set.Slice(minimum:1);
//Using '97' as an upper bound returns a subset without 98: 
var without98 = set.Slice(maximum:97); 

//you can also supply both, of course.
//In this case, note that 2 will be included in the set:
var slice = set.Slice(2, 97); 
```
Performance-wise, key slicers are very fast operations. They are implemented using specialized algorithms.

Note that index slicers for sorted collections can be implemented using key slicers and the [`ByOrder`](M:ImmSortedSet'1.ByOrder) methods.

## Collection operations
Many methods take sequences (in the form of `IEnumerable<T>`) as inputs. There are many examples of these, including [`Union`](M:AbstractSet'2.Union), [`AddLastRange`](M:ImmList'1.AddLastRange), [`Merge`](M:AbstractMap'3.Merge), and [`IsSupersetOf`](M:AbstractSet'2.IsSupersetOf). 

### Comprehension
When you supply an `IEnumerable` to an Imms method, that sequence is interperted as a collection of the same sort as the target, using the same membership semantics (if any). 

For example, if you have two different `ImmSet` objects, `set1` and `set2`, of the same type but different membership semantics (e.g. different `IEqualityComparer` objects), then the following operation:

```csharp
ImmSet<int> set3 = set1.Union(set2);
```

Will use `set1`'s membership semantics. Note that `set2` may contain duplicates under `set1`'s membership semantics. The duplicates are ignored.

### Implicit Optimization
These methods can perform very differently depending on the actual type of the input. This is true for **all** such methods, and is not simply a guideline. 

For example, `ImmList<T>` supports concatenation, so it provides practically instantaneous performance when the input type is also an `ImmList<T>`.

In general, the following kinds of types receive special treatment:

1. Often, collections of the same type (and, in the case of sets and maps, membership semantics) as the target. Sets support specialized set-theoretic operations for these cases, and `ImmList` supports concatenation.
2. Arrays are also optimized. In fact, in most cases, an input collection is converted into an array and the array is handed off to a specialized algorithm.
3. Known collection types, such as those implementing `ICollection<T>` or `IList<T>`, also have optimizations. This includes `Imms` collections of different types.
4. Iterators (such as the result of a `Select` operation) naturally perform slowest of all.

### Single Iteration Guarantee
Because iterating over sequences can produce side-effects, all operations Imms supports that accept an `IEnumerable` will not iterate over it once, and will only go over as many elements as necessary. 

This restriction is somewhat reduced if the input is a known collection type.

This is one of the things methods are tested for, and it's not just a guideline.

### Methods that take functions
Methods that take functions 


