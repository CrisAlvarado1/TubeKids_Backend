const mongoose = require("mongoose");

/**
 * Handles errors that occur during the saving process.
 *
 * @param {Error} error - The error object.
 * @param {Object} res - The response object to send the error response.
 */
const handleSaveError = (error, res) => {
  if (error.code === 11000 && error.keyPattern.email) {
    res.status(409).json({ error: "Email already exists" });
  } else if (error instanceof mongoose.Error.ValidationError) {
    res
      .status(422)
      .json({ error: "Validation error: Please check your request data" });
  } else {
    console.error(`Error while saving the new resource`, error);
    res.status(500).json({ error: `Error while saving the new resource` });
  }
};

/**
 * Saves a new object of the specified model to the database.
 *
 * @param {Model} Model - The model instance to be saved.
 * @param {*} res - The response object.
 * @param {string} modelName - The name of the model.
 */
const create = async (Model, res, modelName) => {
  try {
    const data = await Model.save();
    res.header({
      location: `/api/tubekids/${modelName}/?id=${data.id}`,
    });
    res.status(201).json(data);
  } catch (error) {
    handleSaveError(error, res);
  }
};

/**
 * Retrieves a specific model object by its ID.
 *
 * @param {Model} Model - The model to query.
 * @param {*} req - The request object containing the ID.
 * @param {*} res - The response object.
 */
const getById = async (Model, req, res) => {
  try {
    const data = await Model.findById(req.query.id);
    if (!data) {
      res.status(404).json({ error: "Requested element not found" });
      return;
    }
    res.status(200).json(data);
  } catch (error) {
    console.error("Error while querying the specific model", error);
    res
      .status(500)
      .json({ error: "Error while querying the specific model element" });
  }
};

/**
 * Retrieve all model objects
 *
 * @param {Model} Model - The model to query.
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const getAll = async (Model, req, res) => {
  try {
    const data = await Model.find();
    if (!data) {
      res.status(404).json({ error: "Requested elements not found" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error("Error while querying all models", error);
    res.status(500).json({ error: "Error while querying the model elements" });
  }
};

/**
 * Deletes a specific object of model
 *
 * @param {Model} Model - The model to query.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @param {string} modelName - The name of the model.
 */
const deleteModel = async (Model, req, res, modelName) => {
  try {
    const id = req.query.id;
    if (!id) {
      res.status(400).json({ error: "ID not provided" });
      return;
    }

    const specificModel = await Model.findById(id);
    if (!specificModel) {
      res.status(404).json({ error: `Model with ID ${id} not found` });
      return;
    }

    await specificModel.deleteOne();
    res.status(204).json({});
  } catch (error) {
    console.error(`Error while deleting the ${modelName}`, error);
    res.status(500).json({ error: `Error while deleting the ${modelName}` });
  }
};

/**
 * Update an existing model object by ID.
 *
 * @param {Model} Model - The model to update.
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const update = async (Model, req, res) => {
  try {
    const id = req.query.id;
    if (!id) {
      res.status(400).json({ error: "ID not provided" });
      return;
    }

    const data = req.body;
    const updatedModel = await Model.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });

    if (!updatedModel) {
      res.status(404).json({ error: `Model with ID ${id} not found` });
      return;
    }

    res.status(200).json(updatedModel);
  } catch (error) {
    handleSaveError(error, res);
  }
};

module.exports = {
  create,
  getById,
  getAll,
  update,
  deleteModel,
};
