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

/**
 * Represents boards in the model.
 * @public
 */
export class BoardsRepo {
  boards: IBoard[];
  constructor() {
    this.boards = [];
  }

  /**
   * Get all boards
   * @returns Promise resolve all boards
   */
  getAll() {
    return Promise.resolve(this.boards);
  }

  /**
   * Get boards by id
   * @param id - id of board string
   * @returns Promise resolve board by id
   */
  getById(id: string) {
    return Promise.resolve(this.boards.find((board) => board.id === id));
  }

  /**
   * Add board to model
   * @param body - board has type IBoardBody
   * @returns Promise resolve board by id
   */
  add(body: IBoardBody) {
    return new Promise((res) => {
      const board = { ...body, id: uuid() };
      this.boards = [...this.boards, board];
      res(board);
    });
  }

  /**
   * Update board to model
   * @param id - id of board string
   * @param body - board has type IBoardBody
   * @returns Promise resolve updated board by id
   */
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

  /**
   * Delete board by id
   * @param id - id of board string
   * @returns Promise resolve null
   */
  delete(id: string) {
    this.boards = this.boards.filter((board) => board.id !== id);
    return Promise.resolve(null);
  }
}
