import { app } from './app.js';
import config from './common/config.js';

const start = async () => {
  try {
    await app.listen(config.PORT);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
