import fastify from 'fastify';
import fastifySwagger from 'fastify-swagger';
import path from 'path';
import fs from 'fs';
import { boardRoutes } from './resources/boards/router';
import { usersRoutes } from './resources/users/router';
import { taskRoutes } from './resources/tasks/router';

const stream = fs.createWriteStream('./log.txt');

export const server = fastify({ logger: { stream } });

server.register(fastifySwagger, {
  exposeRoute: true,
  routePrefix: '/doc',
  mode: 'static',
  specification: {
    path: path.join(__dirname, '../doc/api.yaml'),
    baseDir: '/src',
  },
});

// routers
server.register(boardRoutes);
server.register(usersRoutes);
server.register(taskRoutes);
