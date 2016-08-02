***
layout: main
title: Why Immutable?
description: The benefits of immutable collections versus mutable collections.
styles:
  - documentation.css

***


# Immutability
<div class="tldr">
    Immutable and persistent collections are collections that behave just like strings. You can't modify them, but you can transform them to get modified collections.
</div>
 
An immutable and persistent collection is one that can't be changed, but still supports operations such as `Add` and `Remove`.
 
Instead of actually changing the collection itself, these operations transform the collection, returning a *new* one with the desired modifications.
 
This rather intuitive behavior is very similar to how strings work in .NET. It's also similar to how numbers work, for that matter.
 
This is how operations on immutable and persistent objects look like:

```csharp
/** String: **/
var str = "Hello World";
var newStr = str + "!";
//still: str == "Hello World"

/** Integer: **/
var n = 5;
var m = n + 1;
//still: n == 5

/** Imms Collection: **/
var immList = ImmList.Of(1, 2, 3);
var newImmList = immList.AddLast(4);
//still: immList == [1, 2, 3]
```

In contrast, a *mutable* object behaves like this:

```csharp
var mutableList = new List<int>() {1, 2, 3};
mutableList.Add(4);
//mutableList != [1, 2, 3] :(
```

In the latter example, the `mutableList` object has been mutated, and its original value information is gone.
 
Now, why is the behavior in the first example better than in the second one?
 
That's a trick question, of course. It really isn't. It's just different. Both kinds of collections are useful in different circumstances.

### Structural sharing
Strings achieve their persistence by directly copying the whole thing every time you transform it. This works well for small amounts of data, but is impractical and prohibitive for collections that can potentialy contain thousands of elements. It's expensive in both time and memory.

The immutable and persistent collections provided by Imms support an optimization known as *structural sharing*. Basically, when you transform a collection (such as by adding an element to the end), the resulting collection shares almost all of its structure with the previous one, with only small differences.

So if you have a million collections, each with a million elements and each differing in only a single element, you can only require as much memory as ten collections, an incredible optimization.

## Why immutable?

A persistent and immutable colleciton has several benefits over mutable collections. In fact, immutable collections are particularly useful in an environment that has mutable objects.

### General Advantages

These general advantages apply no matter what kind of code you're writing.

1. #### Safer Code
	Mutation makes code more error-prone and harder to analyze. Using immutable objects unless there is reason not to helps reduce the complexity of the program and can get rid of bugs before they appear.

2. #### Tight control over state
	Since immutable collections cannot be changed, you can expose them (possibly in behind interfaces) without fear for the internal state of an object, while still giving the user the full functionality of the collection.

	This is best illustrated with the familiar example of strings. If you expose a string, the user can build upon it and transform it, but can't change it behind your back. If you expose a `List<char>`, however, the user can change it without your knowledge.

	In contrast, if you expose it as `IEnumerable<char>`, the user can't change it behind your back, but can't leverage the unique functionality of a string either.

3. #### Thread safety
	Since immutable collections cannot be changed, the thread safety of a single instance is not an issue. Any number of reading threads can be active at the same time without interfering with anything else.

	Although multiple writing threads can run into problems of working on out-dated information, this can be solved with locks that never interfere with reading.

	Furthermore, "changing" an immutable collection basically amounts to changing a reference, which is an atomic operation.

### Additional Advantages
Only some kinds of code will benefit from these advantages.

1. #### High performance for operators
	An operator in this context is an operation on one or more collections that returns another collection, whether the source is mutable or immutable.

	Examples include: subsequence, concatenation, union, and intersection.

	Operators can be implemented exponentially better in immutable collections, by leveraging structural sharing. For example, the `ImmList` collection supports concatenation and splitting in $O(\log n)$. Similar considerations apply to set-theoretic operations over sets.

2. #### Sharing
	If you want to use the same collection in different locations but don't want mutations in one location to affect another, you have to copy it, which can be prohobitively expensive. 

	An immutable collection instance never changes, so it never needs to be copied. You can have references to it in multiple locations in your code without any danger.
	
3. #### Managing multiple similar collections
	In some cases, you want to work with several collections that are largely the same, but have various small or moderate differences. Using mutable collections, you couldn't leverage the similarity of the collections in any way. 
	
	However, persistent and immutable collections make use of structural sharing, whcih lets you store and work with these collections very efficiently. Here are some examples in which this comes into play.
	
	* ##### Snapshots and history Stracking
		As an example, a persistent collection lets you use snapshots to perform history tracking. You can efficiently store snapshots of a collection as it changes.

	* ##### Multiple variations
		Using persistent collections that support structural sharing lets you efficiently store multiple variations of the same collection.
		
		For example, strings that supported structural sharing would let you store `Hello World`, `Hello World?` and `Hello World!` with minimal expenditure of memory.

4. #### Implement other immutable objects
	While you can easily use immutable objects to implement mutable ones (and, in fact, your objects will be less error-prone for it), you cannot use mutable objects to implement immutable ones.
	
	Thus, if you want to create an object that provides one or more of the above benefits, and you need to use a collection in that object, you'll have to use one that's immutable.

## Why not immutable?
It would be wrong, of course, to indulge in [benefits-only analysis](https://medium.com/@bryanedds/just-say-no-to-benefits-only-analysis-183a2fc12e16#.imhx1jzfq). There are many reasons for using mutable collections too. 

1. ### When mutation is desirable
	Perhaps the most obvious reason to avoid immutable collections (at least directly) is that mutation is desirable. This often involves some kind of change notification mechanism.
	
	However, you can still use immutable and persistent collections to implement mutable collections, and the result can still benefit from some of the things we talked about above.
	
2. ### Performance
	
	For most operations, immutable and persistent collections will under-perform against mutable ones, largely because they have a more complex structure and some extra objects must be allocated with every operation. 
	
	Furthermore, persistent collections always inflict more load on the garbage collector, since many old versions of collections aren't needed and can be abandoned.
	
	These problems can be partially aleviated by using a system of mutable builders, and the library is built with this in mind (however, it hasn't been implemented yet).
	
	Also, note that Imms collections are still extremely fast, and are unlikely to bottleneck an application.
	
3. ### Abstraction issues
	Because persistent and immutable collections return a collection of the same type, it can be hard to abstract over them without a sufficiently expresive type system; unfortunately, C# does not have such a type system.
	
	For this reason, abstractin over persistent and immutable collections can sometimes be somewhat awkward.

## More Reading
For more discussion about mutability versus immutability, see the following related links:

* [Why immutable collections?](https://scott.mn/2014/04/27/why_immutable_collections/)
* [Objects Should Be Immutable](http://www.yegor256.com/2014/06/09/objects-should-be-immutable.html)
* [Java theory and practice: To mutate or not to mutate?](http://www.ibm.com/developerworks/library/j-jtp02183/)