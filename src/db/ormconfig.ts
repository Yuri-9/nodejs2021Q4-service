import { createConnection } from 'typeorm';
import { config } from '../common/config';
import { User } from '../entity/user';

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
    synchronize: true,
  })
    .then(() => {
      // here you can start to work with your entities
    })
    .catch((error) => console.log(error));
};
