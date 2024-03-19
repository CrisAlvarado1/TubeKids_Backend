const bodyParser = require("body-parser");
const cors = require("cors");

/**
 * Applies body parser middleware to parse incoming request bodies as JSON.
 *
 * @param {Object} app - The Express application instance.
 */
const applyBodyParser = (app) => {
  app.use(bodyParser.json());
};

/**
 * Applies CORS middleware to allow cross-origin requests.
 *
 * @param {Object} app - The Express application instance.
 */
const applyCors = (app) => {
  app.use(
    cors({
      domains: "*",
      methods: "*",
    })
  );
};

module.exports = {
  applyBodyParser,
  applyCors,
};
