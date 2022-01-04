import { server } from './app';
import { config } from './common/config';

const { PORT } = config;

/**
 * Try start server else log error
 * @returns Promise void
 */
const start = async (): Promise<void> => {
  try {
    if (PORT) {
      await server.listen(PORT, '0.0.0.0');
      console.log(`server run o n port ${PORT}`);      
    }
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
