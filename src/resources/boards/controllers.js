const boards = require('./repository');
const STATUS_CODE = require('../../common/statusCode');

const getBoards = async (req, reply) => {
  const allBoards = await boards.getAll();
  reply.send(allBoards);
};

const getBoard = async (req, reply) => {
  const { id } = req.params;
  const board = await boards.getById(id);
  if (board) reply.send(board);
  reply.code(STATUS_CODE.NOT_FOUND).send(`Board ${id} not founded`);
};

const addBoard = async (req, reply) => {
  const { body } = req;
  const board = await boards.add(body);
  reply.code(STATUS_CODE.OK_CREATE).send(board);
};

const updateBoard = async (req, reply) => {
  const { id } = req.params;
  const { body } = req;
  const updatedBoard = await boards.update(id, body);

  reply.send(updatedBoard);
};

const deleteBoard = async (req, reply) => {
  const { id } = req.params;
  const board = await boards.getById(id);
  if (board) {
    boards.delete(id);
    reply.send(`Board ${id} has been removed`);
  }
  reply.code(STATUS_CODE.NOT_FOUND).send(`Board ${id} not founded`);
};

module.exports = { getBoards, getBoard, addBoard, updateBoard, deleteBoard };
