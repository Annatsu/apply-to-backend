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
 * @param {CommonInterface} deps
 * @return {Promise}
 */
const createServer = async (deps) => {
  const commonInterface =
    typeof deps === 'object' && !Array.isArray(deps)
      ? deps
      : {
          app: express(),
          serverPort: process.env.PORT,
        };

  // Execute all instructions, returning only the application instance at the end.
  return Promise.resolve(commonInterface)
    .then(setupMiddlewares)
    .then(setupRoutes)
    .then(initServer)
    .then(({ app }) => app);
};

/**
 * Register middlewares to the application.
 * @param {CommonInterface} deps
 * @return {CommonInterface}
 */
const setupMiddlewares = async (deps) => {
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
const setupRoutes = async (deps) => {
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

  return new Promise((resolve) => {
    app.listen(serverPort, () => {
      console.log(`Server started on port ${serverPort}`);
      resolve(deps);
    });
  });
};

// Expose the main function.
module.exports = createServer;

// Expose other functions.
module.exports.initServer = initServer;
module.exports.setupRoutes = setupRoutes;
module.exports.setupMiddlewares = setupMiddlewares;
