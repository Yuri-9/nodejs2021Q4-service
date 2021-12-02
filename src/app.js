const app = require('fastify')({ logger: true });

app.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/docs',
  swagger: {
    info: { title: 'fastify-api' },
  },
});

// routers
app.register(require('./resources/users/routes'));
app.register(require('./resources/boards/routes'));
app.register(require('./resources/tasks/routes'));

module.exports = app;
