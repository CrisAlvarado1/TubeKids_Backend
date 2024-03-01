const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restrictedUserSchema = new Schema({
    fullName: { type: String, required: true },
    pin: {
        type: String,
        required: true,
        validate: {
            validator: function (pin) {
                return /^\d{6}$/.test(pin.toString());
            },
            message: 'Pin must be a 6-digit number'
        }
    },
    avatar: { type: String, required: true }, // Save url of the Avatar
    age: { type: Number },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('RestrictedUser', restrictedUserSchema);