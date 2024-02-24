const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

router.post('/create-meeting', meetingController.createMeeting);

module.exports = router;
