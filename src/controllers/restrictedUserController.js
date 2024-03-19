const RestrictedUser = require("../models/restrictedUserModel.js");
const baseController = require("../controllers/baseController.js");

/**
 * Extracts restricted user data from the request body and sets it in an restricted user object.
 *
 * @param {*} req - Request object containing user data
 * @param {object} user - User object to set data into
 * @returns {object} - User object with seted data
 */
const setRestrictedUserData = (restrictedUser, req) => {
  restrictedUser.fullName = req.body.fullName;
  restrictedUser.pin = req.body.pin;
  restrictedUser.avatar = req.body.avatar;
  restrictedUser.age = req.body.age;
  restrictedUser.userId = req._id;
  return restrictedUser;
};

/**
 * Creates a new restricted user
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const restrictedUserPost = (req, res) => {
  let restrictedUser = new RestrictedUser();
  restrictedUser = setRestrictedUserData(restrictedUser, req);
  baseController.create(restrictedUser, res, "restrictedUser");
};

/**
 * Retrieve all model objects filtered by the userId.
 *
 * @param {Model} Model - The model to query.
 * @param {*} res - Response object
 * @param {*} req - Request object
 */
const getByUserId = async (req, res) => {
  try {
    const userId = req._id;
    if (!userId) {
      res.status(404).json({ error: "User ID is required" });
      return;
    }

    const data = await RestrictedUser.find({ userId });
    res.status(200).json(data);
  } catch (error) {
    console.error("Error while querying the model by user ID", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

/**
 * Get specific restricted users if an principal user ID is provided.
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const userRestrictedGet = (req, res) => {
  if (req.query && req.query.id) {
    baseController.getById(RestrictedUser, req, res);
  } else if (req._id) {
    getByUserId(req, res);
  }
};

/** Update a restricted user by ID.
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const restrictedUserPut = (req, res) => {
  baseController.update(RestrictedUser, req, res);
};

/**
 * Deletes a specific restricted user
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const restrictedUserDelete = (req, res) => {
  baseController.deleteModel(RestrictedUser, req, res, "restrictedUser");
};

// Export the functions of this controller
module.exports = {
  restrictedUserPost,
  userRestrictedGet,
  restrictedUserDelete,
  restrictedUserPut,
};
