<div class="tldr">
    Immutable and persistent collections are collections that behave just like strings. You can't modify them, but you can transform them to get modified collections.
   
    The main difference is that immutable and persistent collections tend to be a lot more efficient.
</div>
 
An immutable and persistent collection is one that can't be changed, but still supports operations such as `Add` and `Remove`.
 
Instead of actually changing the collection itself, these operations transform the collection, returning a *new* one with the desired modifications.
 
This rather intuitive behavior is very similar to how strings work in .NET. It's also similar to how numbers work, for that matter.
 
This is how operations on immutable and persistent objects look like:
 
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
 
In contrast, a *mutable* object behaves like this:
 
    var mutableList = new List<int>() {1, 2, 3};
    mutableList.Add(4);
    //mutableList != [1, 2, 3] :(
   
In the latter example, the `mutableList` object has been mutated, and its original value information is gone.
 
Now, why is the behavior in the first example better than in the second one?
 
That's a trick question, of course. It really isn't. It's just different. Both kinds of collections are useful in different circumstances. However, it is true that in most cases, in a perfect world, you'd want the behavior in the first example.



## Mutable vs. Immutable
There are two different ways to approach the question of mutable collections versus immutable ones. One is somewhat philosophical, and the other more practical.

The main difference between mutable and immutable objects, at least in conceptual terms, is that a mutable object is unique. It has an identity.
 
It makes sense for a `Person` to be a mutable object because people have an intrinsic identity. They have a first and last name, but changing them doesn't change who the person is.
 
A mutable list also has an intrinsic identity. You can change its contents, but it remains the same list, and that specific list is referenced in multiple locations, the change will affect all of them.
 
An truly immutable list is nothing more than the series of elements it contains. It's never more than a value.
 
In .NET, this is most felt in strings. Strings behave, in most intents and purposes, exactly like numbers.
 
### Most collections should be values
Most collections we use in daily tasks are *values*, not objects with an identity. The fact that they have this identity is a byproduct of their implementation that we usually don't use.
 
It's usually a programming error to expose a mutable collection publically because we normally don't want anyone to modify it behind our backs. (There are other reasons for why it's an error, but this is a central one).