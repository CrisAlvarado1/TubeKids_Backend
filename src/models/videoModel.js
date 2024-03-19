const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the Video model
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
      message: "You must add the link with a correct format.",
    },
  },
});

// Create and export the Video model based on the schema
module.exports = mongoose.model("Video", videoSchema);
