const jwt = require("jsonwebtoken");
const theSecretKey = process.env.JWT_SECRET_KEY;

const { searchUser } = require("../controllers/userController.js");

/**
 * Creates a JWT token for the provided user credentials and sends it as a response.
 *
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
const createToken = async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await searchUser(req.body.email);
    if (user && user.password === req.body.password) {
      const token = jwt.sign(
        {
          id: user._id,
          email: user.email,
          password: user.password,
          permission: ["create", "edit", "delete", "query"],
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

// Export the function create token
module.exports = {
  createToken,
};
