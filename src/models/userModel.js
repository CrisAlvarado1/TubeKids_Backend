const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validate the format of the email
    message: "Invalid format of the email",
  },
  password: { type: String, required: true },
  pin: {
    type: String,
    required: true,
    validate: {
      validator: function (pin) {
        return /^\d{6}$/.test(pin.toString());
      },
      message: "Pin must be a 6-digit number",
    },
  },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  secondSurname: { type: String, required: true },
  country: { type: String },
  birthdate: {
    type: Date,
    required: true,
    validate: {
      validator: function (date) {
        // Validate the format of the email
        const age = Math.floor(
          (new Date() - new Date(date)) / (1000 * 60 * 60 * 24 * 365)
        );
        return age >= 18;
      },
      message: "You must be at least 18 years old to register.",
    },
  },
  videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
});

module.exports = mongoose.model("User", userSchema);
