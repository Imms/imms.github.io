Each Imms collection has a static helper class with the same name. This helper class has methods for constructing collections, as well as extension methods for converting from one to another.

```csharp
var list = ImmList.Of(1, 2, 3);
var set = ImmSet.Of(1, 2, 3);
```
# List
The helper classes are the following:
- [ImmList](T:ImmList)
- [ImmSet](T:ImmSet)
- [ImmMap](T:ImmMap)
- [ImmSortedMap](T:ImmSortedMap)
- [ImmSortedSet](T:ImmSortedSet)
