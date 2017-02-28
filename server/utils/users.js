class Users {
  constructor() {
    this.users = [];
  }
  addUser(id, name, room) {
    const user = { id, name, room };
    this.users.push(user);
    return user;
  }
  removeUser(id) {
    const isId = user => user.id === id;
    const index = this.users.findIndex(isId);
    if (index === -1) return undefined;
    return this.users.splice(index, 1)[0];
  }
  getUser(id) {
    const isId = user => user.id === id;
    if (!this.users.find(isId)) return undefined;
    return this.users.find(isId).name;
  }
  getUserList(room) {
    return this.users
      .filter(user => user.room === room)
      .map(user => user.name);
  }
}

module.exports = { Users };
