const { v4: uuidv4 } = require('uuid');

// type Task = {
//     id: string,
//     title: string,
//     order: number,
//     description: string,
//     userId: string,
//     boardId: string,
//     columnId: string,
// }

class TasksRepo {
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
      const task = { id: uuidv4(), ...body, boardId };
      this._tasks = [...this._tasks, task];
      res(task);
    });
  }

  update(id, body) {
    return new Promise((res) => {
      let updatedTask;
      this._tasks = this._tasks.map((task) => {
        if (task.id === id) {
          updatedTask = { id, ...body };
          return { id, ...body };
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
}

module.exports = new TasksRepo();
