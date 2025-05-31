// Simple logger utility to log info and errors
const logInfo = (message) => {
  console.log(`INFO: ${message}`);
};

const logError = (error) => {
  console.error(`ERROR: ${error.message}`);
};

module.exports = { logInfo, logError };
