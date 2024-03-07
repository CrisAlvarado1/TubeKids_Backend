const jwt = require("jsonwebtoken");
const theSecretKey = process.env.JWT_SECRET_KEY;

const { searchUserGet } = require("../controllers/userController.js");

/**
 * Creates a JWT token for the provided user credentials and sends it as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createToken = (req, res) => {
  if (req.body.email && req.body.password) {
    let user = searchUserGet(req.body.email, req.body.password);
    if (user) {
      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          permission: ["create", "edit", "delete"],
        },
        theSecretKey
      );
      res.status(201).json({ token });
    } else {
      res.status(422).json({ error: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ error: "Email and password are required" });
  }
};

module.exports = {
  createToken,
};
