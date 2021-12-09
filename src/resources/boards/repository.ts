import { v4 as uuid } from 'uuid';
import { IBoardBody, IColumnBody } from './router';

interface IColumn extends IColumnBody {
  id: string;
  title: string;
  order: number;
}

interface IBoard {
  id: string;
  title: string;
  columns: IColumn[];
}

export class BoardsRepo {
  boards: IBoard[];
  constructor() {
    this.boards = [];
  }

  getAll() {
    return Promise.resolve(this.boards);
  }

  getById(id: string) {
    return Promise.resolve(this.boards.find((board) => board.id === id));
  }

  add(body: IBoardBody) {
    return new Promise((res) => {
      const board = { ...body, id: uuid() };
      this.boards = [...this.boards, board];
      res(board);
    });
  }

  update(id: string, body: IBoardBody) {
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

  delete(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
    return Promise.resolve(null);
  }
}
