// const app = require('fastify')({ logger: true });

import Fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import { boardRoutes } from './resources/boards/router.js';
import { usersRoutes } from './resources/users/router.js';
import { taskRoutes } from './resources/tasks/router.js';

export const app = Fastify({
  logger: true,
});

app.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

// routers
app.register(boardRoutes);
app.register(usersRoutes);
app.register(taskRoutes);
