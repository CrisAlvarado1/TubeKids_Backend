const Video = require('../models/videoModel.js');

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

    await video.save()
        .then(data => {
            res.status(201);
            res.header({
                'location': `/tubekids/video/?id=${data.id}`
            });
            res.json(data);
        })
        .catch(err => {
            res.status(422);
            console.log('Error while saving the new video', err)
            res.json({
                error: 'There was an error saving the new video'
            });
        });
}

/**
 * Retrieve a video by their ID.
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const getVideoById = (req, res) => {
    Video.findById(req.query.id)
        .then(video => {
            res.json(video);
        })
        .catch(err => {
            res.status(404);
            console.log('Error while querying the specific video', err)
            res.json({ error: "Video doesn't exist" })
        });
};

/**
 * Retrieve all videos by User ID (Playlist).
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const getVideosPlaylist = (req, res) => {
    const userId = req.query.userId;

    if (userId) {
        Video.find({ userId }) // Filter by userId
            .then(videos => {
                res.json(videos);
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
 * Get specific video if an ID is provided, otherwise, get the playlist of videos.
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoGet = (req, res) => {
    if (req.query && req.query.id) {
        getVideoById(req, res)
    } else {
        getVideosPlaylist(req, res);
    }
}

/**
 * Updates a specific video
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoPut = async (req, res) => {
    try {
        if (req.query && req.query.id) {
            const video = await Video.findById(req.query.id);
            if (!video) {
                res.status(404);
                console.log("Video doesn't exist");
                return res.json({ error: "Video doesn't exist" });
            }

            // Update the video object
            setVideoData(video, req);

            // Save the updated video
            await video.save();
            res.status(200);
            res.json(video);
        } else {
            res.status(404);
            console.log('Error while updating the video', err)
            res.json({ error: "video ID not provided" });
        }
    } catch (error) {
        res.status(500);
        console.error('Error while updating the video', error);
        res.json({ error: 'There was an error updating the video' });
    }
}

/**
 * Deletes a specific video
 * 
 * @param {*} req - Request object
 * @param {*} res - Response object
 */
const videoDelete = async (req, res) => {
    try {
        if (req.query && req.query.id) {
            const video = await Video.findById(req.query.id);
            if (!video) {
                res.status(404);
                console.log("Video doesn't exist");
                return res.json({ error: "Video doesn't exist" });
            }

            await video.deleteOne();
            res.status(204);
            res.json({});
        } else {
            res.status(404);
            console.log('Error while deleting the video', err)
            res.json({ error: "Video ID not provided" });
        }
    } catch (error) {
        res.status(500);
        console.error('Error while deleting the video', error);
        res.json({ error: 'There was an error deleting the video' });
    }
}

// Export the functions of this controller
module.exports = {
    videoPost,
    videoGet,
    videoPut,
    videoDelete
}