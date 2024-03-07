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
const searchUserGet = async (email, password) => {
  try {
    const data = await User.find({ email, password });
    return data;
  } catch (error) {
    console.error("Error while querying all models", error);
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
  } else {
    baseController.getAll(User, req, res);
  }
};

// Export the functions of this controller
module.exports = {
  userPost,
  userGet,
  searchUserGet,
};
