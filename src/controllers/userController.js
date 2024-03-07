const User = require("../models/userModel.js");
const baseController = require("../controllers/baseController.js");

/**
 * Extracts user data from the request body and sets it in an user object.
 *
 * @param {*} req - Request object containing user data
 * @param {object} user - User object to set data into
 * @returns {object} - User object with seted data
 */
const setUserData = (user, req) => {
  user.email = req.body.email ? req.body.email : "";
  user.password = req.body.password ? req.body.password : "";
  user.pin = req.body.pin ? req.body.pin : "";
  user.name = req.body.name ? req.body.name : "";
  user.surname = req.body.surname ? req.body.surname : "";
  user.secondSurname = req.body.secondSurname ? req.body.secondSurname : "";
  user.country = req.body.country ? req.body.country : "";
  user.birthdate = req.body.birthdate ? req.body.birthdate : "";
  return user;
};

/**
 * Creates a new principal user
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const userPost = async (req, res) => {
  let user = new User();
  user = setUserData(user, req);
  baseController.create(user, res, "user");
};

/**
 * Search if the user exists by email and password
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const searchUserGet = async (req, res) => {
  let email = req.query.email;
  let password = req.query.password;
  try {
    const data = await User.find({ email, password });
    if (!data) {
      res.status(404).json({error: "User with the requested credentials not found"})
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error while querying all models", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get specific user if an ID is provided, otherwise, get all users.
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const userGet = (req, res) => {
  if (req.query && req.query.id) {
    baseController.getById(User, req, res);
  } else if (req.query.email && req.query.password) {
    searchUserGet(req, res);
  } else {
    baseController.getAll(User, req, res);
  }
};

/**
 * Updates a specific user
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const userPut = async (req, res) => {
  baseController.update(User, req, res);
};

/**
 * Deletes a specific user
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const userDelete = async (req, res) => {
  baseController.deleteModel(User, req, res, "user");
};

// Export the functions of this controller
module.exports = {
  userPost,
  userGet,
  userPut,
  userDelete,
  searchUserGet,
};
