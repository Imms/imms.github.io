Sometimes, however, you want to use a mutable collection.
## When mutation is desirable
Perhaps the most obvious reason to avoid immutable collections (at least directly) is that mutation is desirable. This often involves some kind of change notification mechanism.
	
However, you can still use immutable and persistent collections to implement mutable collections, and the result can still benefit from some of the things we talked about above.
## Performance
For most operations, immutable and persistent collections will under-perform against mutable ones, largely because they have a more complex structure and some extra objects must be allocated with every operation. 
	
Furthermore, persistent collections always inflict more load on the garbage collector, since many old versions of collections aren't needed and can be abandoned.
	
These problems can be partially aleviated by using a system of mutable builders, and the library is built with this in mind (however, it hasn't been implemented yet).

Also, note that Imms collections are still extremely fast, and are unlikely to bottleneck an application.