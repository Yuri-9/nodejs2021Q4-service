import { v4 as uuid } from 'uuid';
import { IUserBody } from './router';

interface IUser extends IUserBody {
  id: string;
}

/**
 * Represents users in the model.
 * @public
 */
export class UsersRepo {
  _users: IUser[];
  constructor() {
    this._users = [];
  }

  /**
   * Get user by id
   * @param id - id of user string
   * @returns Promise resolve user by id
   */
  getById(id: string) {
    return Promise.resolve(this._users.find((user) => user.id === id));
  }

  /**
   * Get all tasks
   * @returns Promise resolve all users
   */
  getAll() {
    return Promise.resolve(this._users);
  }

  /**
   * Add user to model
   * @param body - user has type IUserBody
   * @returns Promise resolve user by id
   */
  add(body: IUserBody): Promise<IUser> {
    return new Promise((res) => {
      const user = { ...body, id: uuid() };
      this._users = [...this._users, user];
      res(user);
    });
  }

  /**
   * Update user to model
   * @param id - id of user string
   * @param body - user has type IUserBody
   * @returns Promise resolve updated user by id | undefined
   */
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

  /**
   * Delete user by id
   * @param id - id of user string
   * @returns Promise resolve null
   */
  delete(id: string) {
    this._users = this._users.filter((user) => user.id !== id);
    return Promise.resolve(null);
  }
}
