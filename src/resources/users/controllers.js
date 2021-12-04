const { v4: uuidv4 } = require('uuid');
let users = require('./repository');
const STATUS_CODE = require('../../common/statusCode');

const getUsers = (req, reply) => {
  reply.send(users);
};

const getUser = (req, reply) => {
  const { id } = req.params;
  const item = users.find((it) => it.id === id);
  reply.send(item);
};

const addUser = (req, reply) => {
  const { body } = req;
  const user = { id: uuidv4(), ...body };
  users = [...users, user];

  reply.code(STATUS_CODE.OK_CREATE).send(user);
};

const updateUser = (req, reply) => {
  const { id } = req.params;
  const { body } = req;
  users = users.map((it) => (it.id === id ? { id, ...body } : it));
  const user = users.find((it) => it.id === id);

  reply.send(user);
};

const deleteUser = (req, reply, onDeleteUser) => {
  const { id } = req.params;
  const user = users.find((it) => it.id === id);
  if (!user) reply.code(STATUS_CODE.NOT_FOUND).send(`User ${id} not founded`);
  if (user) {
    users = users.filter((it) => it.id !== id);
    reply.send(`User ${id} has been removed`);
  }
  onDeleteUser();
};

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };
