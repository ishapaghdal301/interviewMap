const Meeting = require('../models/Meeting');

const createMeeting = async (req, res) => {
    try {
        const { interviewerName, interviewerEmail, intervieweeName, intervieweeEmail, meetingLink, meetingTime } = req.body;
        const meeting = new Meeting({
            interviewerName,
            interviewerEmail,
            intervieweeName,
            intervieweeEmail,
            meetingLink,
            meetingTime,
        });
        await meeting.save();

        res.status(201).json({ message: 'Meeting created successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    createMeeting,
};
