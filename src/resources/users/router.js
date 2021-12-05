const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
} = require('./service');

const User = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    login: { type: 'string' },
  },
};

const getUsersOpts = {
  schema: {
    response: {
      200: {
        type: 'array',
        items: User,
      },
    },
  },
  handler: getUsers,
};

const getUserOpts = {
  schema: {
    response: {
      200: User,
    },
  },
  handler: getUser,
};

const postUsersOpts = {
  schema: {
    body: User,
    response: {
      201: User,
    },
  },
  handler: addUser,
};

const updateBoardOpts = {
  schema: {
    response: {
      201: User,
    },
  },
  handler: updateUser,
};

const deleteBoardOpts = {
  schema: {
    // response: {
    //   404: {
    //     type: 'object',
    //     properties: {
    //       message: { type: 'string' },
    //     },
    //   },
    // },
  },
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
  fastify.put('/users/:id', updateBoardOpts);

  // delete user
  fastify.delete('/users/:id', deleteBoardOpts);

  done();
}

module.exports = usersRoutes;
