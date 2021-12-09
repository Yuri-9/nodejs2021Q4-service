import { FastifyReply, FastifyRequest } from 'fastify';
import { isUuid } from '../../utils/isUuid';
import { TasksRepo } from './repository';
import { STATUS_CODE } from '../../common/statusCode';
import { ITaskBody, ITaskParams } from './router';

const tasks = new TasksRepo();

const getTasks = async (
  req: FastifyRequest<{ Params: ITaskParams; Body: ITaskBody }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const tasksOfBoard = await tasks.getAllOfBoard(boardId);
  reply.send(tasksOfBoard);
};

const getTask = async (
  req: FastifyRequest<{ Params: ITaskParams; Body: ITaskBody }>,
  reply: FastifyReply
) => {
  const { taskId } = req.params;
  if (!isUuid(taskId)) {
    reply
      .code(STATUS_CODE.BAD_REQUEST)
      .send(new Error(`Id ${taskId} isn't uuid`));
  }
  const task = await tasks.getById(taskId);
  if (task) reply.send(task);
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${taskId} not found`));
};

const addTask = async (
  req: FastifyRequest<{ Params: ITaskParams; Body: ITaskBody }>,
  reply: FastifyReply
) => {
  const { boardId } = req.params;
  const { body } = req;
  const task = await tasks.add(body, boardId);
  reply.code(STATUS_CODE.OK_CREATE).send(task);
};

const updateTask = async (
  req: FastifyRequest<{ Params: ITaskParams; Body: ITaskBody }>,
  reply: FastifyReply
) => {
  const { taskId } = req.params;
  const { body } = req;
  if (!isUuid(taskId)) {
    reply
      .code(STATUS_CODE.BAD_REQUEST)
      .send(new Error(`Id ${taskId} isn't uuid`));
  }
  const task = await tasks.getById(taskId);
  if (task) {
    const updatedTask = await tasks.update(taskId, body);
    reply.send(updatedTask);
  }
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${taskId} not found`));
};

const deleteTask = async (
  req: FastifyRequest<{ Params: ITaskParams; Body: ITaskBody }>,
  reply: FastifyReply
) => {
  const { taskId } = req.params;
  const task = await tasks.getById(taskId);
  if (task) {
    await tasks.delete(taskId);
    reply.code(STATUS_CODE.OK_DELETE).send();
  }
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${taskId} not found`));
};

const deleteAllTasks = async (boarderId: string) => {
  await tasks.deleteAllOfBoard(boarderId);
};

const setTasksUsersIdNull = async (userId: string) => {
  await tasks.setTasksUsersIdNull(userId);
};

export {
  getTasks,
  getTask,
  addTask,
  deleteTask,
  updateTask,
  deleteAllTasks,
  setTasksUsersIdNull,
};
