module.exports = walk

function walk(hashes, key_fn, find_fn, cmp_fn, next_fn) {
  var seen = {}
    , emit

  hashes = hashes.slice()

  walker.saw = function(key) {
    seen[key] = true
  }

  return walker

  function walker(close, ready) {
    if(close) {
      hashes = 
      seen = null
      return ready(close === true ? null : close)
    }

    if(!hashes.length) {
      return ready()
    }
    emit = ready
    walkiteration(hashes, then_pick)
  }

  function walkiteration(hashes, ready) {
    var expect = hashes.length
      , output = []
      , error

    for(var i = 0, len = hashes.length; i < len; ++i) {
      find_fn(hashes[i], make_got_hash(i))
    }

    function make_got_hash(idx) {
      return function got_hash(err, data) {
        if(error) {
          return
        }
        if(err) {
          error = err
          return ready(err)
        }

        output[idx] = data
        !--expect && ready(null, output)
      } 
    }
  }

  function pick(list) {
    var current = 0 
    for(var i = 1, len = list.length; i < len; ++i) {
      if(cmp_fn(list[current], list[i]) < 0) {
        current = i
      }
    }
    return current
  }

  function then_pick(err, objects) {
    if(err) {
      return emit(err)
    }

    var next
      , which
      , idx
      , key

    while(1) {
      if(!objects.length) {
        return emit()
      }

      idx = pick(objects)
      which = objects[idx]
      key = key_fn(which)
        
      if(seen[key]) {
        objects.splice(idx, 1)
        continue
      }
      break
    }

    seen[key] = true
    next = next_fn(which)

    for(var i = 0, len = objects.length; i < len; ++i) {
      objects[i] = key_fn(objects[i])
    }
    next.unshift(idx)
    next.unshift(1)
    objects.splice.apply(objects, next)
    hashes = objects
    emit(null, which)
  }
}
