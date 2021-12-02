const {
  getTasks,
  getTask,
  addTask,
  updateTask,
  deleteTask,
} = require('./controllers');

const Task = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    order: { type: 'integer' },
    description: { type: 'string' },
    userId: { type: 'string' || null },
    boardId: { type: 'string' || null },
    columnId: { type: 'string' || null },
  },
};

const getTasksOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: Task,
      },
    },
  },
  handler: getTasks,
};

const getTaskOpts = {
  schema: {
    response: {
      200: Task,
    },
  },
  handler: getTask,
};

const postTaskOpts = {
  schema: {
    body: Task,
    response: {
      201: Task,
    },
  },
  handler: addTask,
};

const updateTaskOpts = {
  schema: {
    response: {
      201: Task,
    },
  },
  handler: updateTask,
};

const deleteTaskOpts = {
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
  handler: deleteTask,
};

function TaskRoutes(fastify, options, done) {
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

module.exports = TaskRoutes;
