***
title: Optional Type
layout: main
styles:
  - documentation.css

***

The [`Optional<T>`](T:Optional'1) type is a really useful feature that indicates an optional value of type `T`.

## Why do you need it?
In particular, why not just use `null` and nullable types?

### Uniformity/Abstraction
The .NET framework does not have a single nullable type that can be used to indicate an optional value. It has two distinct kinds of types, nullable value types and (nullable) reference types.

This means it's not possible to write a method like this:

```csharp
///Returns the first element in the list, or None if it's empty.
Optional<T> TryFirst { ... }
````
Because replacing `Optional<T>` with `T?` is invalid for reference types, and saying `T : class` would be absurdly restrictive.

This is why the .NET framework is littered with ugly and inconvenient things like:

```csharp
bool TryGet(TKey key, out TValue value);
```

### Less ambiguity
The fact a reference type is nullable means it's *implicitly optional*. That is, all reference types behave kind of like [`Optional<T>`](T:Optional'1) in that they may not exist. However, in most cases, people do not expect a reference type to be null, or else it's just treated as a kind of invalid value that indicates a bug.

This is one of the reasons nulls are so bad. But optional values make perfect sense in many cases. You just need to be clear about what's optional and what isn't. And optional types let you do that.

### Easier Debugging
Nulls are problematic because they are hard to debug. A `NullReferenceException` tells you next to nothing about what caused the error, partly because anything could be null, and partly because nulls do not contain any runtime type information.

`None` values, in contrast, are still values and do contain information. So when a [`NoValueException`](T:NoValueException) is thrown, you also get the underlying type and possibly some other information.

You can also see additional info in the debugger, where for a null value you'd just see... `null`.

### You can call instance members
Since optionals aren't evil nulls, you can call instance members on them, even when they indicate a missing value. This means you can still use `ToString`, `Equals`, and `GetHashCode`, for example.

## How does it work?
The Imms optional type is a non-nullable value type. It is different from F#'s `Option` type.

An `Optional<T>` has two *states*: `Some(T)`, in which it wraps a value of type `T`, and `None`, in which it wraps no value.

You can check what state it's in using the following code:

```csharp
Optional<T> x;
if(x.IsSome) {
    //x is Some
}
if (x.IsNone) {
    //x is None
}
```
And you can expose the underlying value (if any) using:

```csharp
Optional<int> s = Optional.Some(5);
int v = s.Value;
```
Note that calling `Value` on a `None` instance throws an exception (a `NoValueException`, a subtype of `InvalidOperationException`, is thrown in this case). The exception provides more information than `NullReferenceException`, such as the underlying type.

Note that the `None` values of optionals with different types are functionally distinct in some cases, but are still equal under `Equals` and `GetHashCode`. They may also be compared using the `==` operator.

There is an assortment of methods for interacting with optional values, such as `.Map`, `.Cast`, `.Or`, etc.

## How is it used in Imms?
Optionals are used quite often in Imms, almost every time a value may or may not exist. They're also often used in optional parameters, though not always (usually for the sake of brevity).

Here are some examples:

1. [`FindIndex`](M:AbstractSequential'2.FindIndex), which may not find the index in question.
2. [`TryGet`](M:AbstractMap'3.TryGet), which may not find the key in question.
3. [`Pick`](M:AbstractIterable'3.Pick''1(Func{'0,Optional{''0}})), which takes a function that returns an `Optional`. 

## How do I make one?
You can create an instance of an optional value in several ways.

### The [Optional helper class](T:Optional)
The `Optional` static class contains a number of static methods for constructing optional values. You can use the `use static` feature of C# 6 to integrate it better with the language.

1. [`Optional.Some(x)`](M:Optional.Some) wraps `x` in a `Some` value.
2. [`Optional.None`](P:Optional.None) returns a special token that can be implicitly converted to the `None` value of any optional type.
3. [`Optional.NoneOf<T>`](M:Optional.NoneOf) returns a typed `None` value.

### Extension methods
The extension method [`AsOptional`](M:OptionalExt.AsOptional) (several overloads) lets you convert concrete values into optional values. It maps `null` values to `None` values.

### Implicit conversions
There is an implicit conversion from `T` to `Optional<T>`, so the following code works:

```csharp
Optional<int> x = 5;
```
There is also an explicit conversion from `Optional<T>` to `T`, so the following code compiles but may throw an exception:

```csharp
Optional<int> x;
int y = (int)x;
```

## What can I do with it?
See the documentation of the `Optional` set of classes for more information, but here is a short list of special operations this type supports.

### [Mapping](M:OptionalExt.Map)
Mapping is similar to C# 6's conditional access operator, `?.` (one of the several things you'll be missing out on, unfortunately). It applies a function on the underlying value, if any, or propagates a `None`:

```csharp
Optional<int> n = 5;
Optional<string> str = n.Map(x => x.ToString());
```
It also has an overload that lets the function return `Optional` too:

```csharp
Optional<int> n = 5;
Optional<string> str = n.Map(x => x % 2 == 0 ? Some(x.ToString()) : None);
```

### [Coalescing](M:OptionalExt.Or)
This works similar to the `??` operator, another goody:

```csharp
Optional<int> a = 5;
int b = a.Or(6);
```
It also has an overload in which the default value is also optional:

```csharp
var a = Some(5);
var b = Some(6);
Optional<int> c = a.Or(b);
```

### [Equating](M:Optional'1.Equals)

You can equate optionals with other optionals, both using the [`==`](M:Optional'1.op_Equality) operator and using the `.Equals` method. Equality is structural. Two optionals of different declared types may be equal if their underlying values are equal. All `None` values are equal, whatever the underlying type.

### Optional parameters
You can use optionals for optional parameters, but this usage is a bit tricky. This is because those need to have default value which is a compile-time constant, and optionals are structs that can't take on the null value.

However, this problem can be solved, albeit in a rather verbose way:

```csharp
void ExampleMethod(Optional<int> a = default(Optional<int>)) {
    //...
}
```
This technique is mainly useful when you want to accept an optional parameter of type `T`, which (as mentioned previously), cannot be achieved otherwise.

## Questions and Answers

### When should I use Optional and when should I use null?
Basically, you should use null only when you're feeling lazy (`null` is sure a lot easier to type than `Optional.NoneOf<List<StringBuilder>>()`) or when you want to talk to something that isn't aware of Imms's optional type.

### Why not use F#'s option type?
Because it was written for use with F# and cannot be properly integrated into C# at all. It's just impossible. In contrast, it's actually fairly easy to use Imms's `Optional` type from F#. 

It represents `None` as `null`, which is great when you can write a compiler around it, but terrible otherwise.

Oh, and it's called `FSharpOption`, which really puts the nail in the coffin.

### Why is it a value type?
The main reason for representing it as a reference type is the possibility of representing `None` as `null`. This is a compelling way to integrate it into the language, but it defeats several of the points about having an `Optional` type in the first place.

Conditional access operators aren't an argument in favor of this either, as a `null` should not be used for non-optional types, and conditional access operators naturally propagate nulls and the `Optional` kind is lost.