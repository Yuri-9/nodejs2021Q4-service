const { v4: uuidv4 } = require('uuid');

// type Column = {
//     id: string,
//     title: string,
//     order: number,
// }

// type Board = {
//     id: string,
//     title: string,//
//     columns: [Column],
// }

class BoardsRepo {
  constructor() {
    this.boards = [];
  }

  getAll() {
    return Promise.resolve(this.boards);
  }

  getById(id) {
    return Promise.resolve(this.boards.find((board) => board.id === id));
  }

  add(body) {
    return new Promise((res) => {
      const board = { id: uuidv4(), ...body };
      this.boards = [...this.boards, board];
      res(board);
    });
  }

  update(id, body) {
    return new Promise((res) => {
      let updatedBoard;
      this.boards = this.boards.map((board) => {
        if (board.id === id) {
          updatedBoard = { id, ...body };
          return { id, ...body };
        }
        return board;
      });
      res(updatedBoard);
    });
  }

  delete(id) {
    this.boards = this.boards.filter((board) => board.id !== id);
    return Promise.resolve(null);
  }
}

module.exports = new BoardsRepo();
