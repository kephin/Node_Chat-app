const expect = require('expect');
const { isRealString } = require('./validation');

describe('validation', () => {
  it('should reject non-string values ', () => {
    //arrange
    const num = 1;
    const expected = false;
    //act
    const actual = isRealString(num);
    //assert
    expect(actual).toBe(expected);
  });

  it('should reject only spaces', () => {
    //arrange
    const spaces = '    ';
    const expected = false;
    //act
    const actual = isRealString(spaces);
    //assert
    expect(actual).toBe(expected);
  });

  it('should allow strings with non-space characters', () => {
    //arrange
    const string = 'hi hello  ';
    const expected = true;
    //act
    const actual = isRealString(string);
    //assert
    expect(actual).toBe(expected);
  });
});
