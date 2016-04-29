---
layout: page

title:  "Sequentials"

---
This page talks about operations common to the sequential collections, such as [`ImmList`](T:ImmList'1), which is the primary collection of this kind.

## Kinds of Operations

### Access to the ends
Access to the ends of a collection is supported by methods such as [`AddLast`](M:ImmList'1.AddLast), [`AddFirst`](M:ImmList'1.AddFirst), [`RemoveLast`](M:ImmList'1.RemoveLast) and [`RemoveFirst`](M:ImmList'1.RemoveFirst).

```csharp
var list = ImmList.FromItems(1, 2, 3);
list =
    list.AddLast(4).AddFirst(0).RemoveLast().RemoveFirst()
```

Addition methods have variants that accept sequence, such as [`AddLastRange`](M:ImmList'1.AddLastRange).




These methods (like all methods that accept collections) are optimized based on the input sequence:

1. `ImmList` supports concatenation, so if the other collection is also an `ImmList` the operation is extremely fast, actually as fast as `Update` and `Insert` of single elements.
2. The methods execute faster for array inputs or inputs of known collection types (e.g. `ICollection`, `IList`, etc). This includes other `Imms` collections too, even if they're of a different type.
3. Things like iterators naturally perform the slowest of all.




