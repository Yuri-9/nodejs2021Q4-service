const isUuid = require('../../utils/isUuid');
const tasks = require('./repository');
const STATUS_CODE = require('../../common/statusCode');

const getTasks = async (req, reply) => {
  const { boardId } = req.params;
  const tasksOfBoard = await tasks.getAllOfBoard(boardId);
  reply.send(tasksOfBoard);
};

const getTask = async (req, reply) => {
  const { taskId } = req.params;
  const task = await tasks.getById(taskId);
  if (!isUuid(taskId)) {
    reply.code(STATUS_CODE.BAD_REQUEST).send(`Id of task ${taskId} isn't uuid`);
  }
  if (!task) {
    reply.code(STATUS_CODE.NOT_FOUND).send(`Task ${taskId} not found`);
  } else {
    reply.send(task);
  }
};

const addTask = async (req, reply) => {
  const { boardId } = req.params;
  const { body } = req;
  const task = await tasks.add(body, boardId);
  reply.code(STATUS_CODE.OK_CREATE).send(task);
};

const updateTask = async (req, reply) => {
  const { taskId } = req.params;
  const { body } = req;
  const task = await tasks.update(taskId, body);
  reply.send(task);
};

const deleteTask = async (req, reply) => {
  const { taskId } = req.params;
  const task = await tasks.getById(taskId);
  if (!task) {
    reply.code(STATUS_CODE.NOT_FOUND).send(`Task ${taskId} not found`);
  } else {
    await tasks.delete(taskId);
    reply.code(STATUS_CODE.OK_DELETE).send();
  }
};

module.exports = { getTasks, getTask, addTask, deleteTask, updateTask };
