const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
    phoneNumber: {
        type: String,
        require: true
    },
    role: {
        type: String,
        required: true,
        enum: ['interviewer', 'interviewee'],
    },
    password: {
        type: String,
        require: true
    },
    firstName: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    age: {
        type: Number
    },
    otp: {
        type: String,
    },
    invalidAttempts:{
        type: Number,
        default: 0,
    },
    private_key: {
        type: String,
    }
});

module.exports = mongoose.model('User', userSchema);