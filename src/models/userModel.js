const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Validate the format of the email
        message: 'Invalid format of the email'
    },
    password: { type: String, required: true },
    pin: { type: Number, required: true, min: 100000, max: 999999, message: "Invalid Pin"},
    name: { type: String, required: true },
    surname: { type: String, required: true },
    secondSurname: { type: String, required: true },
    country: { type: String },
    birthdate: {
        type: Date,
        required: true,
        validate: {
            validator: function (value) {
                // Validate the format of the email
                const age = Math.floor((new Date() - new Date(value)) / (1000 * 60 * 60 * 24 * 365));
                return age >= 18;
            },
            message: 'You must be at least 18 years old to register.'
        }
    }
});

module.exports = mongoose.model('User', userSchema);