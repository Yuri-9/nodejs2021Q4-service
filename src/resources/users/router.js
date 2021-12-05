const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require('./service');

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

function usersRoutes(fastify, options, done) {
  // get all users
  fastify.get('/users', getUsersOpts);

  // get single user
  fastify.get('/users/:id', getUserOpts);

  // add user
  fastify.post('/users', postUsersOpts);

  // update user
  fastify.put('/users/:id', updateUserOpts);

  // delete user
  fastify.delete('/users/:id', deleteUserOpts);

  done();
}

module.exports = usersRoutes;
