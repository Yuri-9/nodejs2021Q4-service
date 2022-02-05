import { FastifyInstance } from 'fastify';
import { getUsers, getUser, addUser, updateUser, deleteUser } from './service';

export interface IUserBody {
  name: string;
  login: string;
  password: string;
}

export interface IUserParams {
  id: string;
}

const UserResponse = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const UserRequest = {
  type: 'object',
  required: ['name', 'login', 'password'],
  properties: {
    name: { type: 'string' },
    login: { type: 'string' },
    password: { type: 'string' },
  },
};

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: UserResponse,
      },
    },
    params: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
        },
      },
    },
  },
  handler: getUsers,
};

const getUserOpts = {
  schema: {
    response: {
      200: UserResponse,
    },
  },
  handler: getUser,
};

const postUsersOpts = {
  schema: {
    body: UserRequest,
    response: {
      201: UserResponse,
    },
  },
  handler: addUser,
};

const updateUserOpts = {
  schema: {
    response: {
      200: UserResponse,
    },
  },
  handler: updateUser,
};

const deleteUserOpts = {
  handler: deleteUser,
};

export interface MyPluginOptions {
  myPluginOption: string;
}

/**
 * Serve routes users. Methods get, post, put, delete
 * @param server - fastify instance
 * @param _ - options not revired
 * @param done - callBack
 * @returns void
 */
export function usersRoutes(
  server: FastifyInstance,
  _: { id: string },
  done: () => void
) {
  // get all users
  server.get('/users', getUsersOpts);

  // get single user
  server.get('/users/:id', getUserOpts);

  // add user
  server.post('/users', postUsersOpts);

  // update user
  server.put('/users/:id', updateUserOpts);

  // delete user
  server.delete('/users/:id', deleteUserOpts);

  done();
}
