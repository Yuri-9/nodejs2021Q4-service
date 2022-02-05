import { server } from './app';
import { config } from './common/config';
import { connect } from './db/ormconfig';

const { PORT } = config;

/**
 * Try start server else log error
 * @returns Promise void
 */
const start = async (): Promise<void> => {
  try {
    if (PORT) {
      server.listen(PORT, '0.0.0.0', () => {connect()} );
      console.log(`server run on port ${PORT}`);      
    }
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
