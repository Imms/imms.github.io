---
layout: main
styles:
  - documentation.css

---


# Benefits
Imms is the best immutable collections library for .NET out there. It has many things going for it.
 
1. #### Many supported operations
    Imms collections support a breathtaking number of operations. Many are first-class operations, with specialized algorithms. Others use simpler algorithms, but are still highly optimized. Still others are provided for convenience.
   
    Among other things, this lets you use Imms to implement specialized immutable collections easily and efficiently.
   
2. #### Blazing fast performance
    Imms performs as well or better than other libraries in almost every respect. You don't have to take my word for it -- you can see detailed performance information in the [performance summary](/pages/perfSummary) and in the pages for every collection type.
   
3. #### Intuitive, powerful API
    Imms has a really intuitive and powerful API that's based on LINQ, the standard collections API, and a few more things.
   
    In particular Imms collections support LINQ methods that return a collection of the same kind.
   
4. #### Full documentation
    Imms is fully documented. It has both reference documentation (written in XML Doc) and conceptual documentation, which is written in Markdown and is hosted on this website.
   
    <small>Unfortunately, Imms documentation noteably lacks exception documentation as of this writing.</small>
   
5. #### High level of polish
    Imms collections throw the right exceptions at the right times, everything meant to be hidden actually is hidden (so as not to confuse the user), and they also fully support special debugging views.
   
6. #### F# Integration
    Although the library is written primarily for C#, a separate F# integration library is also available. It contains module bindings, active patterns, collection builders, and other features that make Imms really easy to use from F#.
   
    All the test code was written in F#, so I know what I'm talking about.
   
    <small>Reference API documentation for this part of the library isn't available in HTML form, because there's no generator that can produce it.</small>

7. #### No dependencies, small footprint
    Imms has no dependencies, requring only minimal framework libraries. It consists of only two assemblies (plus the optional F# integration assembly). It exposes only a small number of types and a handful of extension methods.

   ```csharp
   int x = 5;
   ```
