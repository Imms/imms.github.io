Imms brings operators to the world of collections, resulting in more meaningful code.
# Add
All collections support `+` to add elements. For maps, the elements are key-value pairs.
```csharp
// Sets and maps support addition from the right:
var set = ImmSet.Of(1) + 2
var map = ImmMap.Of(Kvp.Of(1, 2)) + Kvp.Of(1, 2)
// Lists support addition from both sides:
var list = 1 + ImmList.Of(2) + 3
```
You can also use `+` to join arrays and other collections.
```csharp
var list = ImmList.Of(1, 2) + ImmList.Of(3, 4) + new[] {5, 6, 7};
var set = ImmSet.Of(1, 2) + ImmSet.Of(3, 4) + new[] {5, 6, 7};
```
# Remove
Keyed collections support `-` to remove specific keys. If the key isn't found the collection will be returned unchanged.
```csharp
var set = ImmSet.Of(1, 2, 3) - 1 - 2;
var map = ImmMap.Of(Kvp.Of(1, 2)) - 1
```
You can also pass a collection of keys, and Imms will remove all of them. This is the same as the `Exclude` operation.
```csharp	
var set = ImmSet.Of(1, 2, 3) - new[] {1, 2};
var map = ImmMap.Of(Kvp.Of(1, 1), Kvp.Of(2, 2), Kvp.Of(3, 3)) - new[] {1, 2};
```
# Equality
All collections meaningfully override equality through both the `Equals` method and the `==` operator. 
```csharp
var x = ImmList.Of(1, 2) == ImmList.Of(1, 3) // False
var y = ImmSet.Of(1, 2) == ImmSet.Of(1, 2) // True
```
# Intersection
```csharp
var intersected = ImmSet.Of(1, 2) & ImmSet.Of(1)
```
# Union
Union is supported using both `|` and `+` for sets.
```csharp
var union1 = ImmSet.Of(1, 2) | ImmSet.Of(3) + ImmSet.Of(4)
```
# Symmetric difference
```csharp
var set1 = ImmSet.Of(1, 2, 3);
var set2 = ImmSet.Of(3, 4, 5);

var intersection = set1 & set2;
var symmetricDifference = set1 ^ set2;