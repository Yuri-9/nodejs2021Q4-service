import { v4 as uuid } from 'uuid';
import { IUserBody } from './router';

interface IUser extends IUserBody {
  id: string;
}

export class UsersRepo {
  _users: IUser[];
  constructor() {
    this._users = [];
  }

  getById(id: string) {
    return Promise.resolve(this._users.find((user) => user.id === id));
  }

  getAll() {
    return Promise.resolve(this._users);
  }

  add(body: IUserBody): Promise<IUser> {
    return new Promise((res) => {
      const user = { ...body, id: uuid() };
      this._users = [...this._users, user];
      res(user);
    });
  }

  update(id: string, body: IUserBody): Promise<IUser | undefined> {
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

  delete(id: string) {
    this._users = this._users.filter((user) => user.id !== id);
    return Promise.resolve(null);
  }
}
