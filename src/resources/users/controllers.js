const isUuid = require('../../utils/isUuid');
const users = require('./repository');
const STATUS_CODE = require('../../common/statusCode');
const { setTasksUsersIdNull } = require('../tasks/controllers');

const getUsers = async (req, reply) => {
  const allUsers = await users.getAll();
  await reply.send(allUsers);
};

const getUser = async (req, reply) => {
  const { id } = req.params;
  const user = await users.getById(id);
  if (!isUuid(id)) {
    reply.code(STATUS_CODE.BAD_REQUEST).send(`Id of task ${id} isn't uuid`);
  }
  if (user) reply.send(user);
  reply.code(STATUS_CODE.NOT_FOUND).send(`Board ${id} not founded`);
};

const addUser = async (req, reply) => {
  const { body } = req;
  const user = await users.add(body);
  reply.code(STATUS_CODE.OK_CREATE).send(user);
};

const updateUser = async (req, reply) => {
  const { id } = req.params;
  const { body } = req;
  if (!isUuid(id)) {
    reply.code(STATUS_CODE.BAD_REQUEST).send(`Id of task ${id} isn't uuid`);
  }
  const updatedUser = await users.update(id, body);
  reply.send(updatedUser);
};

const deleteUser = async (req, reply) => {
  const { id } = req.params;
  const user = await users.getById(id);
  if (user) {
    users.delete(id);
    setTasksUsersIdNull(id);
    reply.send(`Board ${id} has been removed`);
  }
  reply.code(STATUS_CODE.NOT_FOUND).send(`Board ${id} not founded`);
};

module.exports = { getUsers, getUser, addUser, updateUser, deleteUser };
