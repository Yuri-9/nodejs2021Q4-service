import { v4 as uuid } from 'uuid';

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

export class BoardsRepo {
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
      const board = { ...body, id: uuid() };
      this.boards = [...this.boards, board];
      res(board);
    });
  }

  update(id, body) {
    return new Promise((res) => {
      let updatedBoard;
      this.boards = this.boards.map((board) => {
        if (board.id === id) {
          updatedBoard = { ...body, id };
          return { ...body, id };
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
