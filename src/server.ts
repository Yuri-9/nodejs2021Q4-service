import { app } from './app';
import { config } from './common/config';

const { PORT } = config;

const start = async (): Promise<void> => {
  try {
    if (PORT) {
      await app.listen(PORT);
    }
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
