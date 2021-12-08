import { isUuid } from '../../utils/isUuid.js';
import { UsersRepo } from './repository.js';
import { STATUS_CODE } from '../../common/statusCode.js';
import { setTasksUsersIdNull } from '../tasks/service.js';

const users = new UsersRepo();

const getUsers = async (req, reply) => {
  const allUsers = await users.getAll();
  await reply.send(allUsers);
};

const getUser = async (req, reply) => {
  const { id } = req.params;
  if (!isUuid(id)) {
    reply.code(STATUS_CODE.BAD_REQUEST).send(new Error(`Id ${id} isn't uuid`));
  }
  const user = await users.getById(id);
  if (user) reply.send(user);
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${id} not founded`));
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
    reply.code(STATUS_CODE.BAD_REQUEST).send(new Error(`Id ${id} isn't uuid`));
  }
  const user = await users.getById(id);
  if (user) {
    const updatedUser = await users.update(id, body);
    reply.code(STATUS_CODE.OK).send(updatedUser);
  }
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${id} not founded`));
};

const deleteUser = async (req, reply) => {
  const { id } = req.params;
  if (!isUuid(id)) {
    reply.code(STATUS_CODE.BAD_REQUEST).send(new Error(`Id ${id} isn't uuid`));
  }
  const user = await users.getById(id);
  if (user) {
    users.delete(id);
    setTasksUsersIdNull(id);
    reply.send(`User ${id} has been removed`);
  }
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${id} not founded`));
};

export { getUsers, getUser, addUser, updateUser, deleteUser };
