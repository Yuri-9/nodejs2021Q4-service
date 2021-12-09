// const app = require('fastify')({ logger: true });

import Fastify from 'fastify';
// import fastswagger from 'fastify-swagger';
import { boardRoutes } from './resources/boards/router';
import { usersRoutes } from './resources/users/router';
import { taskRoutes } from './resources/tasks/router';

export const app = Fastify({
  logger: true,
});

// app.register(fastswagger, {
//   exposeRoute: true,
//   routePrefix: '/docs',
//   swagger: {
//     info: { title: 'fastify-api' },
//   },
// });

// routers
app.register(boardRoutes);
app.register(usersRoutes);
app.register(taskRoutes);
