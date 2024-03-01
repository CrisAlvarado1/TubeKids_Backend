const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restrictedUserSchema = new Schema({
    fullName: { type: String, required: true },
    pin: { type: Number, required: true, minlength: 6, maxlength: 6, message: "Invalid Pin" },
    avatar: { type: String, required: true }, // Save url of the Avatar
    age: {type: Number},
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('RestrictedUser', restrictedUserSchema);