const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = new Schema({
    name: { type: String, required: true },
    url: {
        type: String,
        required: true,
        validate: {
            validator: function (url) {
                // Validate the format of the url
                const validUrlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
                return validUrlPattern.test(url);
            },
            message: 'You must add the link with a correct format.'
        }
    }
});

module.exports = mongoose.model('Video', videoSchema);