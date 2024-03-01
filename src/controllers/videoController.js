const Video = require('../models/videoModel.js');
const baseController = require('../controllers/baseController.js')

/**
 * Extracts video data from the request body and sets it in an video object.
 * 
 * @param {*} req - Request object containing video data
 * @param {object} user - Video object to set data into
 * @returns {object} - Video object with seted data
 */
const setVideoData = (video, req) => {
    video.name = req.body.name;
    video.url = req.body.url;
    video.userId = req.body.userId;

    return video;
}


/**
 * Creates a new video record
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoPost = async (req, res) => {
    let video = new Video();
    video = setVideoData(video, req);
    baseController.create(video, res, 'video');
}

/**
 * Get specific video if an ID is provided, otherwise, get the playlist of videos.
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoGet = (req, res) => {
    if (req.query && req.query.id) {
        baseController.getById(Video, req, res);
    } else if (req.query && req.query.userId) {
        baseController.getByUserId(Video, req, res)
    }
}

/**
 * Updates a specific video
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoPut = async (req, res) => {
    baseController.update(Video, req, res);
}

/**
 * Deletes a specific video
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoDelete = async (req, res) => {
    baseController.deleteModel(Video, req, res, 'restrictedUser')
}

// Export the functions of this controller
module.exports = {
    videoPost,
    videoGet,
    videoPut,
    videoDelete
}