import { FastifyReply, FastifyRequest } from 'fastify';
import { isUuid } from '../../utils/isUuid';
import { BoardsRepo } from './repository';
import { STATUS_CODE } from '../../common/statusCode';
import { deleteAllTasks } from '../tasks/service';
import { IBoardBody, IBoardParams } from './router';

const boards = new BoardsRepo();

const getBoards = async (_: FastifyRequest, reply: FastifyReply) => {
  const allBoards = await boards.getAll();
  reply.send(allBoards);
};

const getBoard = async (
  req: FastifyRequest<{ Body: IBoardBody; Params: IBoardParams }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  if (!isUuid(id)) {
    reply.code(STATUS_CODE.BAD_REQUEST).send(new Error(`Id ${id} isn't uuid`));
  }
  const board = await boards.getById(id);
  if (board) reply.send(board);
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${id} not founded`));
};

const addBoard = async (
  req: FastifyRequest<{ Body: IBoardBody; Params: IBoardParams }>,
  reply: FastifyReply
) => {
  const { body } = req;
  const board = await boards.add(body);
  reply.code(STATUS_CODE.OK_CREATE).send(board);
};

const updateBoard = async (
  req: FastifyRequest<{ Body: IBoardBody; Params: IBoardParams }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const { body } = req;
  if (!isUuid(id)) {
    reply.code(STATUS_CODE.BAD_REQUEST).send(new Error(`Id ${id} isn't uuid`));
  }
  const board = await boards.getById(id);
  if (board) {
    const updatedBoard = await boards.update(id, body);
    reply.send(updatedBoard);
  }
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${id} not founded`));
};

const deleteBoard = async (
  req: FastifyRequest<{ Body: IBoardBody; Params: IBoardParams }>,
  reply: FastifyReply
) => {
  const { id } = req.params;
  const board = await boards.getById(id);
  if (!isUuid(id)) {
    reply.code(STATUS_CODE.BAD_REQUEST).send(new Error(`Id ${id} isn't uuid`));
  }
  if (board) {
    boards.delete(id);
    deleteAllTasks(id);
    reply.send(`Id ${id} has been removed`);
  }
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${id} not founded`));
};

export { getBoards, getBoard, addBoard, updateBoard, deleteBoard };
