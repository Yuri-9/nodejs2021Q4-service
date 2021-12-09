import { getTasks, getTask, addTask, updateTask, deleteTask } from './service';

const TaskResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'integer' },
    description: { type: 'string' },
    userId: { type: ['null', 'string'] },
    boardId: { type: ['null', 'string'] },
    columnId: { type: ['null', 'string'] },
  },
};

const TaskRequest = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    order: { type: 'integer' },
    description: { type: 'string' },
    userId: { type: ['null', 'string'] },
    boardId: { type: ['null', 'string'] },
    columnId: { type: ['null', 'string'] },
  },
};

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: TaskResponse,
      },
    },
  },
  handler: getTasks,
};

const getTaskOpts = {
  schema: {
    response: {
      200: TaskResponse,
    },
  },
  handler: getTask,
};

const postTaskOpts = {
  schema: {
    body: TaskRequest,
    response: {
      201: TaskResponse,
    },
  },
  handler: addTask,
};

const updateTaskOpts = {
  schema: {
    response: {
      201: TaskResponse,
    },
  },
  handler: updateTask,
};

const deleteTaskOpts = {
  handler: deleteTask,
};

export function taskRoutes(fastify, options, done) {
  // get all Tasks
  fastify.get('/boards/:boardId/tasks', getTasksOpts);

  // get single Task
  fastify.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  // add Task
  fastify.post('/boards/:boardId/tasks', postTaskOpts);

  // update Task
  fastify.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

  // delete Task
  fastify.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);

  done();
}
