var dag = require('./index')
  , test = require('tape')

var db = {}

db[0] = {key: 0, value: 1}
db[1] = {key: 1, value: 2, kids: [0]}
db[2] = {key: 2, value: 3, kids: [4]}
db[3] = {key: 3, value: 4, kids: [2]}
db[4] = {key: 4, value: -1, kids: [0, 1]}

test('test that dag-walk works as expected', function(assert) {
  var walk = dag(['2', '3'], key, find, cmp, next)
    , order = []
  iter()

  function iter() {
    walk(function(err, data) {
      if(err) throw err

      if(!data) {
        assert.deepEqual(order, [4, 3, -1, 2, 1]) 
        return assert.end()
      }
  
      order.push(data.value)      
      iter()
    })
  }

  function key(x) {
    return x.key
  }

  function find(k, ready) {
    return process.nextTick(function() { ready(null, db[k]) })
  }

  function cmp(x, y) {
    return x.value - y.value
  }

  function next(x) {
    return (x.kids || []).slice()
  }
})
