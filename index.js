// Node Modules
const dotenv = require('dotenv');

// Application Modules
const startServer = require('./src/server');

/**
 * Initializes the application.
 *
 * @async
 * @function initialize
 */
async function initialize() {
  dotenv.load();

  try {
    await startServer();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

initialize();
