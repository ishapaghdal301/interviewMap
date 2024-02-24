const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    interviewerName: {
        type: String,
        required: true
    },
    intervieweeName: {
        type: String,
        required: true
    },
    intervieweeEmail: {
        type: String,
        required: true
    },
    interviewerEmail: {
        type: String,
        required: true
    },
    meetingLink: {
        type: String,
        required: true
    },
    meetingTime: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Meeting', meetingSchema);
