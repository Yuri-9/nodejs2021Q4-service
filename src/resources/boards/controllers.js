const { v4: uuidv4 } = require('uuid');
let boards = require('./repository');
const STATUS_CODE = require('../../common/statusCode');

const getBoards = (req, reply) => {
  reply.send(boards);
};

const getBoard = (req, reply) => {
  const { id } = req.params;
  const board = boards.find((it) => it.id === id);
  if (board) reply.send(board);
  reply.code(STATUS_CODE.NOT_FOUND).send(`Board ${id} not founded`);
};

const addBoard = (req, reply) => {
  const { body } = req;
  const board = { id: uuidv4(), ...body };
  boards = [...boards, board];

  reply.code(STATUS_CODE.OK_CREATE).send(board);
};

const updateBoard = (req, reply) => {
  const { id } = req.params;
  const { body } = req;
  boards = boards.map((it) => (it.id === id ? { id, ...body } : it));
  const board = boards.find((it) => it.id === id);

  reply.send(board);
};

const deleteBoard = (req, reply) => {
  const { id } = req.params;
  const board = boards.find((it) => it.id === id);
  if (board) {
    boards = boards.filter((it) => it.id !== id);
    reply.send(`Board ${id} has been removed`);
  }
  reply.code(STATUS_CODE.NOT_FOUND).send(`Board ${id} not founded`);
};

module.exports = { getBoards, getBoard, addBoard, updateBoard, deleteBoard };
