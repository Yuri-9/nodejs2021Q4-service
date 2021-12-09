import { v4 as uuid } from 'uuid';

interface ITask {
  id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

interface ITaskBody {
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export class TasksRepo {
  _tasks: ITask[];
  constructor() {
    this._tasks = [];
  }

  getById(id: string) {
    return Promise.resolve(this._tasks.find((task) => task.id === id));
  }

  getAll() {
    return Promise.resolve(this._tasks);
  }

  getAllOfBoard(boardId: string) {
    return Promise.resolve(
      this._tasks.filter((task) => task.boardId === boardId)
    );
  }

  add(body: ITaskBody, boardId: string) {
    return new Promise((res) => {
      const task = { ...body, id: uuid(), boardId };
      this._tasks = [...this._tasks, task];
      res(task);
    });
  }

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

  delete(id: string) {
    this._tasks = this._tasks.filter((task) => task.id !== id);
    return Promise.resolve(null);
  }

  deleteAllOfBoard(boardId: string) {
    this._tasks = this._tasks.filter((task) => task.boardId !== boardId);
    return Promise.resolve(null);
  }

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
