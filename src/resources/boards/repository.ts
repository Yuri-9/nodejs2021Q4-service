import { v4 as uuid } from 'uuid';
import { Board } from '../../entity/board';
import { ColumnEn } from '../../entity/column';
import { IBoardBody } from './router';

// interface IColumn extends IColumnBody {
//   id: string;
//   title: string;
//   order: number;
// }

// interface IBoard {
//   id: string;
//   title: string;
//   columns: IColumn[];
// }

/**
 * Represents boards in the model.
 * @public
 */
export class BoardsRepo {
  boards: number;

  constructor() {
    this.boards = 0;
  }

  /**
   * Get all boards
   * @returns Promise resolve all boards
   */
  async getAll() {  
    this.boards = 2;
    const users = await Board.find({ relations: ['columns'] });
    return users;
  }

  /**
   * Get boards by id
   * @param id - id of board string
   * @returns Promise resolve board by id
   */
  async getById(id: string) {
    this.boards = 1;
    const board = await Board.findOne({ id }, { relations: ['columns'] });
    return board;
  }

  /**
   * Add board to model
   * @param body - board has type IBoardBody
   * @returns Promise resolve board by id
   */
  async add(body: IBoardBody) {
    this.boards = 3;
    const board = new Board();
    board.id = uuid();
    board.title = body.title;
    const columns = body.columns.map(({ title, order }) => {
      const newColumn = new ColumnEn();
      newColumn.id = uuid();
      newColumn.title = title;
      newColumn.order = order;
      newColumn.save();
      return newColumn;
    });
    board.columns = columns;
    await board.save();
    return board;
  }

  /**
   * Update board to model
   * @param id - id of board string
   * @param body - board has type IBoardBody
   * @returns Promise resolve updated board by id
   */

  async update(id: string, body: IBoardBody) {
    this.boards = 3;
    const board = await Board.findOne({ id }, { relations: ['columns'] });
    if (board) {
      board.title = body.title || board.title;
      await board.save();
      return board;
    }
    return board;
  }

  /**
   * Delete board by id
   * @param id - id of board string
   * @returns Promise resolve null
   */
  async delete(id: string) {
    this.boards = 5;
    const board = await Board.findOne({ id });
    if (board) {
      await Board.remove(board);
    }
    return Promise.resolve(null);
  }
}
