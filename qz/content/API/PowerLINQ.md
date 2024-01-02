Imms overrides LINQ operations, such as `Select` and `Where` with optimized implementations that return a collection of the same type as the input. This also means that they don't execute lazily.
``
Look at the following code as an example:
```csharp
ImmList<string> names = ImmList.Of("greg", "maya", "steve", "franklin");
ImmList<string> startWithG = 
	from name in names
	where name.StartsWith("g")
	select name;

ImmList<string> peopleInBothLists =
	from name in names
	join name2 in startWithG on name equals name2
	orderby name
	select name;
```
# Imms.Abstract
Imms implements LINQ operations and other functionality through the `Imms.Abstract` assembly. This assembly contains highly abstract base classes and interfaces that Imms collections inherit from and implement. 

This works like the much-vaunted [Scala collections API](https://docs.scala-lang.org/overviews/collections-2.13/overview.html), except that C# doesn’t have Scala’s type system, so this turned out to be quite difficult. I eventually settled on a combination of:
1. [Some boilerplate](https://github.com/GregRos/Imms/blob/master/Imms/Imms.Collections/Wrappers/Immutable/List/ImmBindings.cs) that needs to be implemented for each collection
2. [A lot of generic code in base classes](https://github.com/GregRos/Imms/blob/master/Imms/Imms.Abstract/Abstractions/MapLike/AbstractMap.cs)
3. [Some code genertion templates](https://github.com/GregRos/Imms/blob/master/Imms/Imms.Collections/Wrappers/Immutable/Templates/ListLikeClass.cs)

The system can be reused by more specialized collections.