import { v4 as uuid } from 'uuid';

// type User = {
//   id: string,
//   name: string,
//   login: number,
//   password: string,
// };

export class UsersRepo {
  constructor() {
    this._users = [];
  }

  getById(id) {
    return Promise.resolve(this._users.find((user) => user.id === id));
  }

  getAll() {
    return Promise.resolve(this._users);
  }

  add(body) {
    return new Promise((res) => {
      const user = { ...body, id: uuid() };
      this._users = [...this._users, user];
      res(user);
    });
  }

  update(id, body) {
    return new Promise((res) => {
      let updatedUser;
      this._users = this._users.map((user) => {
        if (user.id === id) {
          updatedUser = { ...body, id };
          return { ...body, id };
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
