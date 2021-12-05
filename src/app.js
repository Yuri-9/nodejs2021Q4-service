const app = require('fastify')({ logger: true });

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

// routers
app.register(require('./resources/users/router'));
app.register(require('./resources/boards/router'));
app.register(require('./resources/tasks/router'));

module.exports = app;
