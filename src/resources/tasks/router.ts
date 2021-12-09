import { FastifyInstance } from 'fastify';
import { getTasks, getTask, addTask, updateTask, deleteTask } from './service';

export interface ITaskBody {
  title: string;
  order: number;
  description: string;
  userId: null | string;
  boardId: null | string;
  columnId: null | string;
}

export interface ITaskParams {
  boardId: string | null;
  taskId: string;
}

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

export function taskRoutes(
  server: FastifyInstance,
  options: { id: string },
  done: () => void
) {
  // get all Tasks
  server.get('/boards/:boardId/tasks', getTasksOpts);

  // get single Task
  server.get('/boards/:boardId/tasks/:taskId', getTaskOpts);

  // add Task
  server.post('/boards/:boardId/tasks', postTaskOpts);

  // update Task
  server.put('/boards/:boardId/tasks/:taskId', updateTaskOpts);

  // delete Task
  server.delete('/boards/:boardId/tasks/:taskId', deleteTaskOpts);
  done();
}
