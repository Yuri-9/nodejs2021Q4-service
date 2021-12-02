const { v4: uuidv4 } = require('uuid');
let boards = require('./repository');

const getBoards = (req, reply) => {
  reply.send(boards);
};

const getBoard = (req, reply) => {
  const { id } = req.params;
  const item = boards.find((it) => it.id === id);
  reply.send(item);
};

const addBoard = (req, reply) => {
  const { body } = req;
  const board = { id: uuidv4(), ...body };
  boards = [...boards, board];

  reply.code(201).send(board);
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
  if (!board) reply.code(404).send(`Board ${id} not founded`);
  if (board) {
    boards = boards.filter((it) => it.id !== id);
    reply.send(`Board ${id} has been removed`);
  }
};

module.exports = { getBoards, getBoard, addBoard, updateBoard, deleteBoard };
