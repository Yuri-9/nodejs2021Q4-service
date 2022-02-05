import { v4 as uuid } from 'uuid';
import { Task } from '../../entity/task';
import { ITaskBody } from './router';

/**
 * Represents tasks in the model.
 * @public
 */
export class TasksRepo {
  tasks: number;
  constructor() {
    this.tasks = 0;
  }

  /**
   * Get task by id
   * @param id - id of task string
   * @returns Promise resolve task by id
   */
  async getById(id: string) {
    this.tasks = 1;
    const task = await Task.findOne({ id });
    return task;
  }

  /**
   * Get all tasks
   * @returns Promise resolve all tasks
   */
  async getAll() {
    this.tasks = 2;
    const tasks = await Task.find();
    return tasks;
  }

  /**
   * Get tasks by some board id
   * @param boardId - id of board string | null
   * @returns Promise resolve tasks by some board id
   */
   async getAllOfBoard(boardId: string | null) {
    this.tasks = 3;
    return Promise.resolve(
      // this._tasks.filter((task) => task.boardId === boardId)
      boardId
    );
  }

  /**
   * Add task to model
   * @param body - task has type ITaskBody
   * @param boardId - id of board string | null
   * @returns Promise resolve task by id
   */
  async add(body: ITaskBody, boardId: string | null) {
    this.tasks = 4;
    const task = new Task();
    task.title = body.title;
    task.order = body.order;
    task.description = body.description;

    return new Promise((res) => {
      // const task = { ...body, id: uuid(), boardId };
      // this._tasks = [...this._tasks, task];
      // res(task);
    });
  }

  /**
   * Update task to model
   * @param id - id of task string
   * @param body - task has type ITaskBody
   * @returns Promise resolve updated task by id
   */
   async update(id: string, body: ITaskBody) {
    this.tasks = 3;
    const task = await Task.findOne({ id });
    if (task) {
      task.title = body.title || task.title;
      task.order = body.order || task.order;
      task.description = body.description || task.description;
      await task.save();
    }
    return task;
  }

  /**
   * Delete task by id
   * @param id - id of task string
   * @returns Promise resolve null
   */
   async delete(id: string) {
    this.tasks = 5;
    const task = await Task.findOne({ id });
    if (task) {
      await Task.remove(task);
    } 
    return Promise.resolve(null);
  }

  /**
   * Delete all tasks by board id
   * @param boardId - id of board string
   * @returns Promise resolve null
   */
   async deleteAllOfBoard(boardId: string) {
    this.tasks = 6;
    // this._tasks = this._tasks.filter((task) => task.boardId !== boardId);
    return Promise.resolve(null);
  }

  /**
   * Set id user of tasks to null if user have been deleted
   * @param userId - id of user string
   * @returns Promise resolve null
   */
  setTasksUsersIdNull(userId: string) {
    this.tasks = 7;
    return new Promise((res) => {
      // this._tasks = this._tasks.map((task) => {
      //   if (task.userId === userId) {
      //     return { ...task, userId: null };
      //   }
      //   return task;
      // });
      res(null);
    });
  }
}
