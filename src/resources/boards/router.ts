import { FastifyInstance } from 'fastify';
import {
  getBoards,
  getBoard,
  addBoard,
  updateBoard,
  deleteBoard,
} from './service';

export interface IColumnBody {
  id: string;
  title: string;
  order: number;
}

export interface IBoardBody {
  title: string;
  columns: [IColumnBody];
}

export interface IBoardParams {
  id: string;
}

const Columns = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    order: { type: 'integer' },
  },
};

const Board = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    columns: {
      type: 'array',
      items: Columns,
    },
  },
};

const getBoardsOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Board,
      },
    },
  },
  handler: getBoards,
};

const getBoardOpts = {
  schema: {
    response: {
      200: Board,
    },
  },
  handler: getBoard,
};

const postBoardOpts = {
  schema: {
    body: Board,
    response: {
      201: Board,
    },
  },
  handler: addBoard,
};

const updateBoardOpts = {
  schema: {
    response: {
      201: Board,
    },
  },
  handler: updateBoard,
};

const deleteBoardOpts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          message: { type: 'string' },
        },
      },
    },
  },
  handler: deleteBoard,
};

/**
 * Serve routes boards. Methods get, post, put, delete
 * @param server - fastify instance
 * @param _ - options not revired
 * @param done - callBack
 * @returns void
 */
export function boardRoutes(
  fastify: FastifyInstance,
  _: { id: string },
  done: () => void
) {
  // get all boardes
  fastify.get('/boards', getBoardsOpts);

  // get single board
  fastify.get('/boards/:id', getBoardOpts);

  // add board
  fastify.post('/boards', postBoardOpts);

  // update board
  fastify.put('/boards/:id', updateBoardOpts);

  // delete board
  fastify.delete('/boards/:id', deleteBoardOpts);

  done();
}
