import { FastifyReply, FastifyRequest } from 'fastify';
import { isUuid } from '../../utils/isUuid';
import { UsersRepo } from './repository';
import { STATUS_CODE } from '../../common/statusCode';
import { setTasksUsersIdNull } from '../tasks/service';
import { IUserBody, IUserParams } from './router';

const users = new UsersRepo();

/**
 * Reply send all users
 * @param _ - fastify request
 * @param reply - fastify reply
 * @returns void
 */
const getUsers = async (_: FastifyRequest, reply: FastifyReply) => {
  const allUsers = await users.getAll();
  await reply.send(allUsers);
};

/**
 * Reply send user by id or STATUS_CODE.BAD_REQUEST or STATUS_CODE.NOT_FOUND
 * @param req - fastify request with Params: IUserParams and Body: IUserBody
 * @param reply - fastify reply
 * @returns Promise void
 */
const getUser = async (
  req: FastifyRequest<{ Params: IUserParams; Body: IUserBody }>,
  reply: FastifyReply
) => {
  const { id } = req.params as IUserParams;
  if (!isUuid(id)) {
    reply.code(STATUS_CODE.BAD_REQUEST).send(new Error(`Id ${id} isn't uuid`));
  }
  const user = await users.getById(id);
  if (user) reply.send(user);
  reply.code(STATUS_CODE.NOT_FOUND).send(new Error(`Id ${id} not founded`));
};

/**
 * Reply send STATUS_CODE.OK_CREATE
 * @param req - fastify request with Params: IUserParams and Body: IUserBody
 * @param reply - fastify reply
 * @returns Promise void
 */
const addUser = async (
  req: FastifyRequest<{ Params: IUserParams; Body: IUserBody }>,
  reply: FastifyReply
) => {
  const { body } = req;
  const user = await users.add(body);
  reply.code(STATUS_CODE.OK_CREATE).send(user);
};

/**
 * Reply send updated user or STATUS_CODE.BAD_REQUEST or STATUS_CODE.NOT_FOUND
 * @param req - fastify request with Params: IUserParams and Body: IUserBody
 * @param reply - fastify reply
 * @returns Promise void
 */
const updateUser = async (
  req: FastifyRequest<{ Params: IUserParams; Body: IUserBody }>,
  reply: FastifyReply
) => {
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

/**
 * Reply send successfully if user has deleted or STATUS_CODE.BAD_REQUEST or STATUS_CODE.NOT_FOUND
 * @param req - fastify request with Params: IUserParams and Body: IUserBody
 * @param reply - fastify reply
 * @returns Promise void
 */
const deleteUser = async (
  req: FastifyRequest<{ Params: IUserParams; Body: IUserBody }>,
  reply: FastifyReply
) => {
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
