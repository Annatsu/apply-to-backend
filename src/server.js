// Node Modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Application Modules
const makeIndexRouter = require('./routes');

const startServer = () => {
  return Promise.resolve({ app: express() })
    .then(setupMiddlewares)
    .then(setupRoutes)
    .then(initServer);
};

const setupMiddlewares = ({ app }) => {
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(morgan('dev'));

  return { app };
};

const setupRoutes = ({ app }) => {
  app.use('/static', express.static(path.resolve(__dirname, 'static')));
  app.use('/', makeIndexRouter());

  return { app };
};

const initServer = ({ app }) => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });

  return { app };
};

module.exports = startServer;
