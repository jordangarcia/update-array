jest.autoMockOff();

lcs = require('../lib/longest-common-substring')

describe('#longest-common-substring', function() {
  it('should find the longest common string', function() {
    var string1 = [1,2,3,4,5,6,7,8];
    var string2 = [21,22,23,4,5,6,77,78,7,8];
    var expects = {startString1: 3, startString2: 3, length: 3};
    var result = lcs(string1, string2);
    expect(result.startString1).toEqual(expects.startString1);
    expect(result.startString2).toEqual(expects.startString2);
    expect(result.length).toEqual(expects.length);
  })
})
