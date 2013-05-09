# dag-walk

walk a directed acyclic graph, given a key function, comparison function, find function,
and a next function.

```javascript
  var walk = dag(['HASH1', 'HASH2'], key, find, cmp, next)

  walk(null, function(err, data) {
    // data === undefined if no more items
  })
```

## API

#### dag([key list], key_function, find_function, comparison_function, next_function) -> fn(close, ready)

create a dag walker using the following definitions:

##### `key_function(object) -> "key"`

##### `find_function("key", ready(err, data))`

##### `comparison_function(object, object) -> [-1...1]`

##### `next_function(object) -> ["key", "key", ...]`

## License

MIT
