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
        req._id = decodedToken.id;
        next();
      });
    } catch (e) {
      res.status(401).json({
        error: "Unauthorized ",
      });
    }
  } else {
    res.status(401).json({
      error: "Unauthorized ",
    });
  }
};

module.exports = jwtMiddleware;
