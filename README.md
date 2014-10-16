# Array Updater

Makes mutations to objects in array if the objects id is the same as the new array.

#### Usage

```js
var updateArray = require('array-updater');

var original = [
  { id: 1, val: 'one' },
  { id: 2, val: 'two' },
  { id: 3, val: 'three' },
];

var newArray = [
  { id: 3, val: 'new three' },
  { id: 1, val: 'one' },
];

updateArray(original, newArray);

// original[0] now points to the old original[2] with the updated `val` field
// original[1] now points to the old original[1]
```

#### Thanks

Thanks to @mirkokiefer for building the id-diff library
