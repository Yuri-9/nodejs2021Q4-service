import { v4 as uuid } from 'uuid';

// type Task = {
//     id: string,
//     title: string,
//     order: number,
//     description: string,
//     userId: string,
//     boardId: string,
//     columnId: string,
// }

export class TasksRepo {
  constructor() {
    this._tasks = [];
  }

  getById(id) {
    return Promise.resolve(this._tasks.find((task) => task.id === id));
  }

  getAll() {
    return Promise.resolve(this._tasks);
  }

  getAllOfBoard(boardId) {
    return Promise.resolve(
      this._tasks.filter((task) => task.boardId === boardId)
    );
  }

  add(body, boardId) {
    return new Promise((res) => {
      const task = { ...body, id: uuid(), boardId };
      this._tasks = [...this._tasks, task];
      res(task);
    });
  }

  update(id, body) {
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

  delete(id) {
    this._tasks = this._tasks.filter((task) => task.id !== id);
    return Promise.resolve(null);
  }

  deleteAllOfBoard(boardId) {
    this._tasks = this._tasks.filter((task) => task.boardId !== boardId);
    return Promise.resolve(null);
  }

  setTasksUsersIdNull(userId) {
    return new Promise((res) => {
      this._tasks = this._tasks.map((task) => {
        if (task.userId === userId) {
          return { ...task, userId: null };
        }
        return task;
      });
      res();
    });
  }
}
