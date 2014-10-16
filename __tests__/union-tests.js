jest.autoMockOff();

var union = require('../lib/union');

var createObj = function(id) {
  return { id: id };
};

describe('#union', function() {
  it('should union arrays of numbers', function() {
    var arr1 = [1, 2, 3, 4, 3];
    var arr2 = [3, 1, 5];
    var arr3 = [5, 100];

    var result = union(arr1, arr2, arr3);
    var expected = [1, 2, 3, 4, 5, 100];
    expect(result).toEqual(expected);
  });

  it('should union arrays of objects', function() {
    var obj1 = createObj(1);
    var obj2 = createObj(2);
    var obj3 = createObj(3);
    var obj4 = createObj(4);
    var obj5 = createObj(5);

    var arr1 = [obj1, obj2, obj2];
    var arr2 = [obj3, obj2];
    var arr3 = [obj1, obj4, obj5];

    var result = union(arr1, arr2, arr3);

    var expected = [obj1, obj2, obj3, obj4, obj5];
    expect(result).toEqual(expected);
  });
});
