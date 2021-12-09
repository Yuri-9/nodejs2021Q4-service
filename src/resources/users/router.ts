import { FastifyInstance } from 'fastify';
import { getUsers, getUser, addUser, updateUser, deleteUser } from './service';

export interface IUserBody {
  name: string;
  login: number;
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

export function usersRoutes(
  server: FastifyInstance,
  options: { id: string },
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
