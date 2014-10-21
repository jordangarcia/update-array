jest.autoMockOff();

var updater = require('../index');

function createObj(id, val) {
  return {
    id: id,
    val: val
  };
}

describe('array-updater', function() {
  it('should update in place for a partial match', function() {
    var obj1 = createObj(1, 'one');
    var obj2 = createObj(2, 'two');
    var obj3 = createObj(3, 'three');
    var obj4 = createObj(4, 'four');

    var new2 = createObj(2, 'new 2')
    var new3 = createObj(3, 'new 3')

    var orig = [obj1, obj3, obj2, obj4];
    var newArr = [new2, new3];

    updater(orig, newArr);

    expect(orig.length).toBe(2);
    expect(orig[0]).toEqual(new2);
    expect(orig[1]).toEqual(new3);
  });

  it('should update in place objects matching the same id', function() {
    var obj1 = createObj(1, 'one');
    var obj2 = createObj(2, 'two');
    var obj3 = createObj(3, 'three');
    var obj4 = createObj(4, 'four');
    var obj5 = createObj(5, 'five');

    var newThree = createObj(3, 'new three');
    var sameTwo = createObj(2, 'two');
    var newOne = createObj(1, 'new one');

    var orig = [obj1, obj2, obj3, obj5];
    var newArr = [newOne, sameTwo, newThree, obj4, obj5];

    updater(orig, newArr);

    expect(orig[0]).toBe(obj1);
    expect(orig[0]).toEqual(newOne);

    expect(orig[1]).toBe(obj2);
    expect(orig[1]).toEqual(sameTwo);

    expect(orig[2]).toBe(obj3);
    expect(orig[2]).toEqual(newThree);

    expect(orig[3]).toBe(obj4);

    expect(orig[4]).toBe(obj5);
  });

  it('should update in place for rearranged objects', function() {
    var obj1 = createObj(1, 'one');
    var obj2 = createObj(2, 'two');
    var obj3 = createObj(3, 'three');
    var obj4 = createObj(4, 'four');
    var obj5 = createObj(5, 'five');

    var newThree = createObj(3, 'new three');
    var sameTwo = createObj(2, 'two');
    var newOne = createObj(1, 'new one');

    var orig = [obj1, obj2, obj3, obj5];
    var newArr = [obj4, sameTwo, newOne, newThree, obj5];

    updater(orig, newArr);

    expect(orig[0]).toBe(obj4);

    expect(orig[1]).toBe(obj2);
    expect(orig[1]).toEqual(sameTwo);

    expect(orig[2]).toBe(obj1);
    expect(orig[2]).toEqual(newOne);

    expect(orig[3]).toBe(obj3);
    expect(orig[3]).toEqual(newThree);

    expect(orig[4]).toBe(obj5);
  });

  it('should work for empty arrays', function() {
    var obj1 = createObj(1, 'one');
    var obj2 = createObj(2, 'two');
    var obj3 = createObj(3, 'three');
    var obj4 = createObj(4, 'four');
    var obj5 = createObj(5, 'five');

    var newThree = createObj(3, 'new three');
    var sameTwo = createObj(2, 'two');
    var newOne = createObj(1, 'new one');

    var orig = [];
    var newArr = [obj4, sameTwo, newOne, newThree, obj5];

    updater(orig, newArr);

    expect(orig[0]).toBe(obj4);
    expect(orig[1]).toBe(sameTwo);
    expect(orig[2]).toBe(newOne);
    expect(orig[3]).toBe(newThree);
    expect(orig[4]).toBe(obj5);
  });

  it('should delete and rearrange entries in place', function() {
    var obj1 = createObj(1, 'one');
    var obj2 = createObj(2, 'two');
    var obj3 = createObj(3, 'three');
    var obj4 = createObj(4, 'four');
    var obj5 = createObj(5, 'five');

    var newThree = createObj(3, 'new three');
    var sameTwo = createObj(2, 'two');
    var newOne = createObj(1, 'new one');

    var orig = [obj1, obj2, obj3, obj4, obj5];
    var newArr = [newThree, sameTwo, newOne];

    updater(orig, newArr);

    expect(orig[0]).toBe(obj3);
    expect(orig[0]).toEqual(newThree);
    expect(orig[1]).toBe(obj2);
    expect(orig[1]).toEqual(sameTwo);
    expect(orig[2]).toBe(obj1);
    expect(orig[2]).toEqual(newOne);

    expect(orig.length).toBe(3);
  });

  it('should delete everything when given an empty array', function() {
    var obj1 = createObj(1, 'one');
    var obj2 = createObj(2, 'two');
    var obj3 = createObj(3, 'three');
    var obj4 = createObj(4, 'four');
    var obj5 = createObj(5, 'five');

    var orig = [obj1, obj2, obj3, obj4, obj5];
    var newArr = [];

    updater(orig, newArr);

    expect(orig.length).toBe(0)
  });
});
