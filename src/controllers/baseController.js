/**
 * Saves a new object of the specified model to the database.
 * 
 * @param {Model} model - The model instance to be saved.
 * @param {*} res - The response object.
 * @param {string} modelName - The name of the model.
 */
const create = async (model, res, modelName) => {
    await model.save()
        .then(data => {
            res.status(201);
            res.header({
                'location': `/tubekids/${modelName}/?id=${data.id}`
            });
            res.json(data);
        })
        .catch(err => {
            res.status(422);
            console.log(`Error while saving the ${modelName}`, err)
            res.json({
                error: 'There was an error saving'
            });
        });
};

/**
 * Retrieves a specific model object by its ID.
 * 
 * @param {Model} model - The model to query.
 * @param {*} res - The response object.
 * @param {*} req - The request object containing the ID.
 */
const getById = async (model, req, res) => {
    model.findById(req.query.id)
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.status(404);
            console.log('Error while querying the specific model', err)
            res.json({ error: "Model doesn't exist" })
        });
};

/**
 * Retrieve all model objects filtered by the userId.
 * 
 * @param {Model} Model - The model to query.
 * @param {*} res - Response object
 * @param {*} req - Request object
 */
const getByUserId = (Model, req, res) => {
    const userId = req.query.userId;

    if (userId) {
        Model.find({ userId }) // Filter by userId
            .then(data => {
                res.json(data);
            })
            .catch(err => {
                res.status(422);
                res.json({ "error": err });
            });
    } else {
        res.status(404);
        res.json({ "error": "User ID is required" });
    }
};


/**
 * Retrieve all model objects
 * 
 * @param {Model} Model - The model to query.
 * @param {*} res - Response object
 * @param {*} req - Request object
 */
const getAll = (model, req, res) => {
    model.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            res.status(422);
            res.json({ "error": error });
        })
};

/**
 * Deletes a specific object of model
 * 
 * @param {Model} Model - The model to query.
 * @param {*} req - Request object
 * @param {*} res - Response object
 * @param {string} modelName - The name of the model.
 */
const deleteModel = async (model, req, res, modelName) => {
    try {
        const id = req.query.id;
        if (id) {
            const specificModel = await model.findById(id);
            if (!specificModel) {
                res.status(404);
                console.log(`${modelName} doesn't exist`);
                return res.json({ error: `${modelName} doesn't exist` });
            }

            await specificModel.deleteOne();
            res.status(204);
            res.json({});
        } else {
            res.status(404);
            console.log(`Error while deleting the ${modelName}`, err)
            res.json({ error: "ID not provided" });
        }
    } catch (error) {
        res.status(500);
        console.error(`Error while deleting the ${modelName}`, error);
        res.json({ error: `Error while deleting the ${modelName}` });
    }
};

/**
 * Update an existing model object by ID.
 * 
 * @param {Model} Model - The model to update.
 * @param {*} res - Response object
 * @param {*} req - Request object
 */
const update = async (Model, req, res) => {
    try {
        const id = req.query.id;
        if (id) {
            let data = req.body;
            const updatedModel = await Model.findByIdAndUpdate(id, data, { new: true });

            if (!updatedModel) {
                res.status(404);
                console.log(`Model with ID ${id} not found`);
                return res.json({ error: "Model not found" });
            }

            res.status(200);
            res.json(updatedModel);
        } else {
            res.status(404);
            return res.json({ error: "Model doesn't exist" });
        }
    } catch (error) {
        res.status(500);
        console.error('Error while updating the model', error);
        res.json({ error: 'There was an error updating the model' });
    }
}


module.exports = {
    create,
    getById,
    getByUserId,
    getAll,
    update,
    deleteModel
};
