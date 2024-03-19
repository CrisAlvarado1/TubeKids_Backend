const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for the RestrictedUser model
const restrictedUserSchema = new Schema({
  fullName: { type: String, required: true },
  pin: {
    type: String,
    required: true,
    validate: {
      // Validate the pin format
      validator: function (pin) {
        return /^\d{6}$/.test(pin.toString());
      },
      message: "Pin must be a 6-digit number",
    },
  },
  avatar: { type: String, required: true },
  age: { type: Number },
  // Reference to the User model
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

// Create and export the RestrictedUser model based on the schema
module.exports = mongoose.model("RestrictedUser", restrictedUserSchema);
