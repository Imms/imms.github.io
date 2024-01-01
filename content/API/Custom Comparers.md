Imms Maps and Sets support custom equality semantics via `IComparer<T>` or `IEqualityComparer<T>` instances. You can create a collection with specific comparison semantics using the factory methods in the [[Helper]] classes.
```csharp
var setWithComparer = ImmSet.Empty(MyEqComparer);
```

Each time an operation results in the creation of a new collection it will inherit the previous collection’s equality/comparison semantics. Two collections with different comparison semantics generally can’t take part in the same operation.

Imms compares the comparers using `==` reference equality to determine if two collections have the same comparison semantics. This means that if you initialize two collections with different instances of the same comparer, Imms will consider them to have different semantics.

To make it easier to create collections with custom comparers, Imms adds extension methods to both `IComparer<T>` and `IEqualityComparer<T>` for creating Imms collections based on them.

```csharp
var sortedMap = comparer.CreateSortedMap<int, string>();
var map = eqComparer.CreateMap<int, int>();
```
