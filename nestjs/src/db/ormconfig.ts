import { createConnection } from 'typeorm';
import { ConnectionOptions } from 'typeorm';
import { config } from '../common/config';
import { User } from '../entity/user';
import { Board } from '../entity/board';
import { Task } from '../entity/task';
import { ColumnEn } from '../entity/column';

const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_HOST,
} = config;

export const connect = async () => {
  console.log(config);

  await createConnection({
    type: 'postgres',
    host: POSTGRES_HOST,
    port: Number(POSTGRES_PORT),
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
    entities: [User],
    // entities: [User, Board, Task, ColumnEn],
    synchronize: true,
  })
    .then(() => {
      // here you can start to work with your entities
    })
    .catch((error) => console.log(error));
};

export const ormConfig = {
  type: 'postgres',
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [User],
  // entities: [User, Board, Task, ColumnEn],
  synchronize: true,
} as ConnectionOptions;
