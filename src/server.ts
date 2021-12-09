import { app } from './app';
import config from './common/config';

const start = async (): Promise<void> => {
  try {
    await app.listen(400);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
