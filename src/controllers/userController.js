const User = require('../models/userModel.js');

/**
 * Extracts user data from the request body and sets it in an user object.
 * 
 * @param {*} req - Request object containing user data
 * @param {object} user - User object to set data into
 * @returns {object} - User object with seted data
 */
const setUserData = (user, req) => {
    user.email = req.body.email;
    user.password = req.body.password;
    user.pin = req.body.pin;
    user.name = req.body.name;
    user.surname = req.body.surname;
    user.secondSurname = req.body.secondSurname;
    user.country = req.body.country;
    user.birthdate = req.body.birthdate;

    return user;
}

/**
 * Creates a new principal user
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const userPost = async (req, res) => {
    let user = new User();
    user = setUserData(user, req);

    await user.save()
        .then(data => {
            res.status(201);
            res.header({
                'location': `/tubekids/user/?id=${data.id}`
            });
            res.json(data);
        })
        .catch(err => {
            res.status(422);
            console.log('Error while saving the new user', err)
            res.json({
                error: 'There was an error saving the new user'
            });
        });
}

/**
 * Retrieve a user by their ID.
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const getUserById = (req, res) => {
    User.findById(req.query.id)
        .then(user => {
            res.json(user);
        })
        .catch(err => {
            res.status(404);
            console.log('Error while querying the specific user', err)
            res.json({ error: "User doesn't exist" })
        });
};

/**
 * Retrieve all users.
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const getAllUsers = (req, res) => {
    User.find()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(422);
            res.json({ "error": err });
        })
};

/**
 * Get specific user if an ID is provided, otherwise, get all users.
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const userGet = (req, res) => {
    if (req.query && req.query.id) {
        getUserById(req, res)
    } else {
        getAllUsers(req, res);
    }
}

/**
 * Updates a specific user
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const userPut = async (req, res) => {
    try {
        if (req.query && req.query.id) {
            const user = await User.findById(req.query.id);
            if (!user) {
                res.status(404);
                console.log("User doesn't exist");
                return res.json({ error: "User doesn't exist" });
            }

            // Update the user object
            setUserData(user, req);

            // Save the updated user
            await user.save();
            res.status(200);
            res.json(user);
        } else {
            res.status(404);
            console.log('Error while updating the user', err)
            res.json({ error: "User ID not provided" });
        }
    } catch (error) {
        res.status(500);
        console.error('Error while updating the user', error);
        res.json({ error: 'There was an error updating the user' });
    }
}

/**
 * Deletes a specific user
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const userDelete = async (req, res) => {
    try {
        if (req.query && req.query.id) {
            const user = await User.findById(req.query.id);
            if (!user) {
                res.status(404);
                console.log("User doesn't exist");
                return res.json({ error: "User doesn't exist" });
            }

            await user.deleteOne();
            res.status(204);
            res.json({});
        } else {
            res.status(404);
            console.log('Error while deleting the user', err)
            res.json({ error: "User ID not provided" });
        }
    } catch (error) {
        res.status(500);
        console.error('Error while deleting the user', error);
        res.json({ error: 'There was an error deleting the user' });
    }
}


// Export the functions of this controller
module.exports = {
    userPost,
    userGet,
    userPut,
    userDelete
}