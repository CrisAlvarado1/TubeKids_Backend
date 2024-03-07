const Video = require("../models/videoModel.js");
const User = require("../models/userModel.js");
const baseController = require("../controllers/baseController.js");

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
  return video;
};

/**
 * Add the video to the array of videos on the specific user
 *
 * @param videoId - ID of the new video record.
 * @param userId - ID of the principal user.
 */
const addVideoToUser = async (videoId, userId) => {
  try {
    await User.findByIdAndUpdate(userId, { $push: { videos: videoId } });
  } catch (error) {
    console.log("Error while associating video with user");
  }
};

/**
 * Creates a new video record
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoPost = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (userId) {
      // Add a new video
      let video = new Video();
      video = setVideoData(video, req);
      await baseController.create(video, res, "video");

      // Add the new record of video to the principal user
      const videoId = video._id;
      await addVideoToUser(videoId, userId);
    } else {
      res.status(400).json({ error: "userId is required" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Retrieve videos associate a specific user.
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const getVideosByUser = async (req, res) => {
  try {
    const user = await User.findById(req.query.userId).populate("videos");
    if (!user) {
      res.status(404).json({ error: "No data found for the user ID provided" });
      console.log("User not found for search the related videos");
    }
    res.status(200).json(user.videos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

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
    getVideosByUser(req, res);
  }
};

/**
 * Updates a specific video
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoPut = async (req, res) => {
  baseController.update(Video, req, res);
};

/**
 * Removes a video from a user's video array.
 *
 * @param {*} videoId - ID of the video to delete
 * @param {*} userId - ID of principal User
 */
const removeVideoFromUser = async (videoId, userId) => {
  try {
    await User.findByIdAndUpdate(userId, { $pull: { videos: videoId } });
  } catch (error) {
    console.log("Error while removing video from user");
  }
};

/**
 * Deletes a specific video
 *
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoDelete = async (req, res) => {
  try {
    const videoId = req.query.id;
    const userId = req.query.userId;
    await removeVideoFromUser(videoId, userId);
    await baseController.deleteModel(Video, req, res, "video");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Export the functions of this controller
module.exports = {
  videoPost,
  videoGet,
  videoPut,
  videoDelete,
};
