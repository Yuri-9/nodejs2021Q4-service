const {
  getBoards,
  getBoard,
  addBoard,
  deleteBoard,
  updateBoard,
} = require('./controllers');

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

const updateBoardOpts = {
  schema: {
    response: {
      201: Board,
    },
  },
  handler: updateBoard,
};

function boardRoutes(fastify, options, done) {
  // get all boardes
  fastify.get('/boards', getBoardsOpts);

  // get single board
  fastify.get('/boards/:id', getBoardOpts);

  // add board
  fastify.post('/boards', postBoardOpts);

  // delete board
  fastify.delete('/boards/:id', deleteBoardOpts);

  // delete board
  fastify.put('/boards/:id', updateBoardOpts);

  done();
}

module.exports = boardRoutes;
