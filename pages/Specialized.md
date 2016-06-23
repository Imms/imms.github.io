---
layout: main
styles:
  - documentation.css

---
# Specialized Collections
In the future, Imms should offer a variety of specialized immutable collections built on top of the core immutable collections presented in the previous sections. Some examples of possible specialized collections:

1. A flexible priority queue, which is an ordered collection that keeps elements according to their sort order, and allows for duplicates.
2. A multi-set. This is a set where elements can appear more than once, and a number of 'appearances' is kept for each element.
3. A multi-map. This is a map where more than one value can be associated with the same key.
4. A graph, which links keys together bi-directionally. The same key can be associated with any number of other keys in the graph. Entirely new elements can be added, and links between keys can be created or removed.

These collections will not offer optimal performance because they won't be implemented first-class, using custom data structures, but they will still perform well.