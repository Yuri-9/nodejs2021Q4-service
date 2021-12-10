import { v4 as uuid } from 'uuid';
import { ITaskBody } from './router';

interface ITask extends ITaskBody {
  id: string;
}

/**
 * Represents tasks in the model.
 * @public
 */
export class TasksRepo {
  _tasks: ITask[];
  constructor() {
    this._tasks = [];
  }

  /**
   * Get task by id
   * @param id - id of task string
   * @returns Promise resolve task by id
   */
  getById(id: string) {
    return Promise.resolve(this._tasks.find((task) => task.id === id));
  }

  /**
   * Get all tasks
   * @returns Promise resolve all tasks
   */
  getAll() {
    return Promise.resolve(this._tasks);
  }

  /**
   * Get tasks by some board id
   * @param boardId - id of board string | null
   * @returns Promise resolve tasks by some board id
   */
  getAllOfBoard(boardId: string | null) {
    return Promise.resolve(
      this._tasks.filter((task) => task.boardId === boardId)
    );
  }

  /**
   * Add task to model
   * @param body - task has type ITaskBody
   * @param boardId - id of board string | null
   * @returns Promise resolve task by id
   */
  add(body: ITaskBody, boardId: string | null) {
    return new Promise((res) => {
      const task = { ...body, id: uuid(), boardId };
      this._tasks = [...this._tasks, task];
      res(task);
    });
  }

  /**
   * Update task to model
   * @param id - id of task string
   * @param body - task has type ITaskBody
   * @returns Promise resolve updated task by id
   */
  update(id: string, body: ITaskBody) {
    return new Promise((res) => {
      let updatedTask;
      this._tasks = this._tasks.map((task) => {
        if (task.id === id) {
          updatedTask = { ...body, id };
          return { ...body, id };
        }
        return task;
      });
      res(updatedTask);
    });
  }

  /**
   * Delete task by id
   * @param id - id of task string
   * @returns Promise resolve null
   */
  delete(id: string) {
    this._tasks = this._tasks.filter((task) => task.id !== id);
    return Promise.resolve(null);
  }

  /**
   * Delete all tasks by board id
   * @param boardId - id of board string
   * @returns Promise resolve null
   */
  deleteAllOfBoard(boardId: string) {
    this._tasks = this._tasks.filter((task) => task.boardId !== boardId);
    return Promise.resolve(null);
  }

  /**
   * Set id user of tasks to null if user have been deleted
   * @param userId - id of user string
   * @returns Promise resolve null
   */
  setTasksUsersIdNull(userId: string) {
    return new Promise((res) => {
      this._tasks = this._tasks.map((task) => {
        if (task.userId === userId) {
          return { ...task, userId: null };
        }
        return task;
      });
      res(null);
    });
  }
}
