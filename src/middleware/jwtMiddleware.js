const jwt = require("jsonwebtoken");
const theSecretKey = process.env.JWT_SECRET_KEY;

/**
 * Middleware function to handle JWT authentication.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @param {Function} next - The next middleware function in the request-response cycle.
 */
const jwtMiddleware = (req, res, next) => {
  if (req.headers["authorization"]) {
    const authToken = req.headers["authorization"].split(" ")[1];
    try {
      jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
        if (err || !decodedToken) {
          res.status(401).json({
            error: "Unauthorized",
          });
        }
        console.log("Welcome", decodedToken.name);
        next();
      });
    } catch (e) {
      res.status(401);
      res.send({
        error: "Unauthorized ",
      });
    }
  } else {
    res.status(401);
    res.send({
      error: "Unauthorized ",
    });
  }
};

module.exports = jwtMiddleware;
