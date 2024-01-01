Imms is a powerful, high-performance library of immutable and persistent collections for the .NET Framework. It's fully documented, benchmarked, and tested. It's the best of its kind.

It also has a number of additional, highly useful features, such as an [[Optional]] type.
* [[Immutable collections]]
* [[Why/Imms]]

Imms requires .NET Framework version 4.5 or higher.
# Collections
Imms provides the following collections. Each is fully documented and tested, and benchmarks are available.
## [ImmList](T:ImmList'1)
Similar to `List<T>`, but immutable. The library's flagship collection.

It's a flexible and high-performance collection that supports a wide variety of useful operations, such as splitting and concatenation, indexing, and O(1) fast access to both ends.
[[List|More info]]
## [ImmSet](T:ImmSet'1)
A hash set. 

Supports fast set-theoretic operations and relations.
[[Sets|More info]]
### [ImmSortedSet](T:ImmSortedSet'1)
A sorted version of `ImmSet`. Has additional operations that rely on its ordering.
## [ImmMap](T:ImmMap'2)
A key-value Dictionary or HashMap. 

Supports lookup and update by key.
[More info](/content/maps)
## [ImmSortedMap](T:ImmSortedMap'2)
A sorted version of `ImmMap`. 

Supports additional operations that rely on its ordering.
[[Maps|More info]]
# API
Imms collections share the same features, naming conventions, and functionality. 
## Helper Classes
![[Helper]]
## Indexing
![[Indexing]]

## LINQ Overrides
![[LINQ Overrides]]

## Operators
![[Operators]]