All keyed collections use custom key semantics by providing an `IEqualityComparer<T>` or `IComparer<T>` instance. You have to provide on of these unless your key type implements `IEquatable<T>` or `IComparable<T>`, in which case the default is used. 

You can create instances that use custom key semantics using the [[Helper]] classes.
```csharp
ImmSet<string> setWithComparer = ImmSet.Empty<string>(MyEqComparer);
ImmMap<string> mapWithComparer = ImmMap.Empty<string>(MyEqComparer);
```

You can also use extension methods defined directly on the key semantics objects.
```csharp
var sortedMap = comparer.CreateSortedMap<int, string>();
var map = eqComparer.CreateMap<int, int>();
```
# Inheritance
New collection instances inherit the key semantics used by their source collection. It’s not possible to change the key semantics of a collection after it has been created.
# Compatibility
Imms keyed collections support high-performance set-theoretic operations. These operations only work when all inputs are **compatible**. This means that their key semantics must be identical. Imms checks this using the following code, which defaults to reference equality:

```csharp
set.EqualityComparer.Equals(otherSet.EqualityComparer);
```

If you provide an incompatible collection, it will instead be treated as a n `IEnumerable<T>` and the high-performance implementation won’t be used.

All keyed and sorted collections support custom comparison logic via `IComparer<T>` or `IEqualityComparer<T>` instances, as well as default behavior for keys that implement `IEquatable<T>` or `IComparable<T>`.