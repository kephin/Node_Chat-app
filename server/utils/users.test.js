const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  const users = new Users();

  beforeEach(() => {
    users.users = [{
      id: '1',
      name: 'kevin',
      room: 'NodeJs Course',
    }, {
      id: '2',
      name: 'gigi',
      room: 'VueJs Course',
    }, {
      id: '3',
      name: 'johnny',
      room: 'NodeJs Course',
    }];
  });

  it('should add new user', () => {
    //arrange
    const user = {
      id: '123',
      name: 'kephin',
      room: 'JavaScript',
    };
    //act
    const actual = users.addUser(user.id, user.name, user.room);
    //assert
    expect(actual).toEqual(user);
  });

  it('should get user list by room name', () => {
    //arrange
    const expected = ['kevin', 'johnny'];
    //act
    const actual = users.getUserList('NodeJs Course');
    //assert
    expect(actual).toEqual(expected);
  });

  it('should remove user', () => {
    //arrange
    const userCount = users.users.length;
    //act
    users.removeUser('3');
    //assert
    expect(users.users.length).toBe(userCount - 1);
  });

  it('should NOT remove user', () => {
    //arrange
    const userCount = users.users.length;
    //act
    users.removeUser('99');
    //assert
    expect(users.users.length).toBe(userCount);
  });

  it('should find user', () => {
    //arrange
    const expected = users.users[0];
    //act
    const actual = users.getUser('1');
    //assert
    expect(actual).toBe(expected);
  });

  it('should NOT find user', () => {
    //arrange
    //act
    const actual = users.getUser('99');
    //assert
    expect(actual).toNotExist();
  });
});
