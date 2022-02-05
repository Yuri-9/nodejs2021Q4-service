import { v4 as uuid } from 'uuid';
import { IUserBody } from './router';
import { User } from '../../entity/user';

/**
 * Represents users in the model.
 * @public
 */
export class UsersRepo {
  users: number;
  constructor() {
    this.users = 0;
  }

  /**
   * Get user by id
   * @param id - id of user string
   * @returns Promise resolve user by id
   */
  async getById(id: string) {
    this.users = 1;
    const user = await User.findOne({ id });
    return user;
  }

  /**
   * Get all tasks
   * @returns Promise resolve all users
   */
  async getAll() {
    this.users = 2;
    const users = await User.find();
    return users;
  }

  /**
   * Add user to model
   * @param body - user has type IUserBody
   * @returns Promise resolve user by id
   */
  async add(body: IUserBody) {
    this.users = 3;
    const user = new User();
    user.id = uuid();
    user.name = body.name;
    user.login = body.login;
    user.password = body.password;
    await user.save();

    return user;
  }

  /**
   * Update user to model
   * @param id - id of user string
   * @param body - user has type IUserBody
   * @returns Promise resolve updated user by id | undefined
   */

  async update(id: string, body: IUserBody) {
    this.users = 4;
    const user = await User.findOne({ id });
    if (user) {
      user.name = body.name || user.name;
      user.login = body.login || user.login;
      user.password = body.password || user.password;
      const r = await user.save();
      return r;
    }
    return user
  }

  /**
   * Delete user by id
   * @param id - id of user string
   * @returns Promise resolve null
   */
  async delete(id: string) {
    this.users = 5;
    const user = await User.findOne({ id });
    if (user) {
      await User.remove(user);
    }
    return Promise.resolve(null);
  }
}
