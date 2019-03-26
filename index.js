// Node Modules
const dotenv = require('dotenv');

// Application Modules
const createServer = require('./src/server');

/**
 * Initializes the application.
 *
 * @async
 * @function initialize
 */
async function initialize() {
  dotenv.config();

  try {
    await createServer();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

initialize();
