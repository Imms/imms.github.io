---
layout: main
title: Future Features
description: Future features of the Imms immutable collections library.
mathjax: true
styles:
  - documentation.css

---
# Future Features
Some probable future features include:

## More Collections
In the future, Imms should offer a variety of specialized immutable collections built on top of the core immutable collections presented in the previous sections. Some examples of possible specialized collections:

1. A flexible priority queue, which is an ordered collection that keeps elements according to their sort order, and allows for duplicates.
2. A multi-set. This is a set where elements can appear more than once, and a number of 'appearances' is kept for each element.
3. A multi-map. This is a map where more than one value can be associated with the same key.
4. A graph, which links keys together bi-directionally. The same key can be associated with any number of other keys in the graph. Entirely new elements can be added, and links between keys can be created or removed.

These collections will not offer optimal performance because they won't be implemented first-class, using custom data structures, but they will still perform well.

## Mutability
Part of the appeal of immutable collections is their ability to control mutation, rather than suppressing it completely, and enhance the functionality of mutable collections. To this end, several kinds of mutable collections be built based around the immutable collections provided by Imms.

### Advanced Mutable Collections
Part of the appeal of immutable collections is that they allow you to control mutability. To this end, it's possible to write a set of mutable collections that rely on Imms, with features including:

1. History tracking
2. Change notification
3. Snapshots
4. Thread safety

### Collection Builders
Imms collections have the groundwork for providing highly efficient mutable collection builders.

A collection builder is a mutable version of an Imms collection. You can change this collection and when you're done, you can produce an immutable version of the collection in a single operation. Here is an example of the concept:

```csharp
ImmList<int> originalList = ImmList.Of(1, 2, 3, 4);
ImmListBuilder<int> builder = originalList.Builder();
builder.AddLast(5);
builder.AddFirst(0);
builder.AddLastRange(new[] {5, 6, 7});
ImmList<int> newList = builder.Produce();
builder.AddLast(8); //this is still legal with Imms collection builders.
builder.AddFirst(-1);
ImmList<int> newList2 = builder.Produce(); //another immutable collection
```

A more idiomatic approach is the following:

```csharp
ImmList<int> originalList = ImmList.Of(1, 2, 3, 4);
ImmList<int> newList = originalList.Build((ImmListBuilder<int> b) => {
	b.AddLast(5);
	b.AddFirst(0);
});
```

Collection builders solve several problems simultaneously:

1. They are more efficient than immutable collections because they can mutate parts of the underlying data structure (but only those parts that cannot be accessed by any other collection).
2. They can be used as a compatibility layer between Imms collections and an interface that expects a mutable collection.

The `Build()` and `Produce()` operations are constant time operations, but `Produce()` reduces the efficiency of the collection builder, because calling it reduces the builder's ability to mutate the underlying data structure.
	
Collection builders are already used as an internal optimization in many situations, but require a bit more work to be publically accessible.