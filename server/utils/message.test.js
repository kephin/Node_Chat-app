const expect = require('expect');
const { generateMessage } = require('./message');

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
