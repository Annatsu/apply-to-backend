// Node Modules
const express = require('express');
const morgan = require('morgan');
const path = require('path');

// Application Modules
const makeIndexRouter = require('./routes');

/**
 * The shared object dependency that is used between all function units.
 * @typedef {Object} CommonInterface
 * @property {Object} app - an instance of an express application
 * @property {Number} serverPort - the port in which the server will listen for requests
 */

/**
 * Initialize the application server.
 * @return {Promise}
 */
const createServer = () => {
  const commonInterface = {
    app: express(),
    serverPort: process.env.PORT,
  };

  return Promise.resolve(commonInterface)
    .then(setupMiddlewares)
    .then(setupRoutes)
    .then(initServer);
};

/**
 * Register middlewares to the application.
 * @param {CommonInterface} deps
 * @return {CommonInterface}
 */
const setupMiddlewares = (deps) => {
  const { app } = deps;

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan('dev'));

  return deps;
};

/**
 * Connect the existing routes into the application.
 * @param {CommonInterface} deps
 * @return {CommonInterface}
 */
const setupRoutes = (deps) => {
  const { app } = deps;

  app.use('/static', express.static(path.resolve(__dirname, 'static')));
  app.use('/', makeIndexRouter());

  return deps;
};

/**
 * Start listening for requests.
 * @param {CommonInterface} deps
 * @return {CommonInterface}
 */
const initServer = (deps) => {
  const { app, serverPort } = deps;

  app.listen(serverPort, () => {
    console.log(`Server started on port ${serverPort}`);
  });

  return deps;
};

// Expose the main function.
module.exports = createServer;

// Expose other functions.
module.exports.initServer = initServer;
module.exports.setupRoutes = setupRoutes;
module.exports.setupMiddlewares = setupMiddlewares;
