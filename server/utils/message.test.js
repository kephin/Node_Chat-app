const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should return message object', () => {
    //arrange
    const expected = {
      from: 'kevin',
      text: 'Hello, this is kevin.',
    };
    //act
    const actual = generateMessage('kevin', 'Hello, this is kevin.');
    //assert
    expect(actual).toInclude(expected);
    expect(actual.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    //arrange
    const expected = {
      from: 'kevin',
      url: 'http://www.google.com/maps?q=1,1',
    };
    //act
    const actual = generateLocationMessage('kevin', 1, 1);
    //assert
    expect(actual).toInclude(expected);
    expect(actual.createdAt).toBeA('number');
  });
});
