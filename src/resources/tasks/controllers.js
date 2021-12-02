const { v4: uuidv4 } = require('uuid');
let tasks = require('./repository');

const getTasks = (req, reply) => {
  const { boardId } = req.params;
  const tasksOfBoard = tasks.filter((it) => it.boardId === boardId);
  reply.send(tasksOfBoard);
};

const getTask = (req, reply) => {
  const { taskId } = req.params;
  const task = tasks.find((it) => it.id === taskId);
  reply.send(task);
};

const addTask = (req, reply) => {
  const { boardId } = req.params;
  const { body } = req;
  const columnId = uuidv4(); // TODO  get columnId
  const task = { id: uuidv4(), ...body, boardId, columnId };
  tasks = [...tasks, task];

  reply.code(201).send(task);
};

const updateTask = (req, reply) => {
  const { taskId } = req.params;
  const { body } = req;
  console.log('bodybodybodybodybody', body);
  tasks = tasks.map((it) => {
    if (it.id === taskId) {
      return { id: taskId, ...body };
    }
    return it;
  });
  const task = tasks.find((it) => it.id === taskId);

  reply.send(task);
};

const deleteTask = (req, reply) => {
  const { taskId } = req.params;
  const task = tasks.find((it) => it.id === taskId);
  if (!task) reply.code(404).send(`Task ${taskId} not founded`);
  if (task) {
    tasks = tasks.filter((it) => it.id !== taskId);
    reply.send(`Task ${taskId} has been removed`);
  }
};

module.exports = { getTasks, getTask, addTask, deleteTask, updateTask };
