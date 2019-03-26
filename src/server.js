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

const setupMiddlewares = ({ app, ...rest }) => {
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(morgan('dev'));

  return { app, ...rest };
};

const setupRoutes = ({ app, ...rest }) => {
  app.use('/static', express.static(path.resolve(__dirname, 'static')));
  app.use('/', makeIndexRouter());

  return { app, ...rest };
};

const initServer = ({ app, ...rest }) => {
  app.listen(process.env.PORT, () => {
    console.log(`Server started on port ${process.env.PORT}`);
  });

  return { app, ...rest };
};

module.exports = startServer;
