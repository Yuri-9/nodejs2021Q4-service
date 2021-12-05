const { v4: uuidv4 } = require('uuid');

// type User = {
//     id: string,
//     name: string,
//     login: number,
//     password: string,
// }

class UsersRepo {
  constructor() {
    this._users = [];
  }

  getById(id) {
    return Promise.resolve(this._users.find((user) => user.id === id));
  }

  getAll() {
    return Promise.resolve(this._users);
  }

  getAllOfBoard(boardId) {
    return Promise.resolve(
      this._users.filter((user) => user.boardId === boardId)
    );
  }

  add(body, boardId) {
    return new Promise((res) => {
      const user = { id: uuidv4(), ...body, boardId };
      this._users = [...this._users, user];
      res(user);
    });
  }

  update(id, body) {
    return new Promise((res) => {
      let updatedUser;
      this._users = this._users.map((user) => {
        if (user.id === id) {
          updatedUser = { id, ...body };
          return { id, ...body };
        }
        return user;
      });
      res(updatedUser);
    });
  }

  delete(id) {
    this._users = this._users.filter((user) => user.id !== id);
    return Promise.resolve(null);
  }
}

module.exports = new UsersRepo();
