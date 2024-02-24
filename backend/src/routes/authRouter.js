const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

const verifyToken = require('../config/authMiddleware');
const authController = require('../controllers/authController');

router.post('/register', [
    check('username', 'Please enter a valid username').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 }),
    check('phoneNumber', 'Please enter a valid phone number').isLength({min: 10}),
    check('firstName', 'Please enter a valid first name').not().isEmpty(),
    check('lastName', 'Please enter a valid last name').not().isEmpty(),
    check('role', 'Please enter a valid role').isIn(['interviewer', 'interviewee'])
], authController.register);

router.post('/verify-otp-register', [
    check('email', 'Please enter a valid email').notEmpty(),
    check('otp', 'Please enter the OTP').notEmpty()
], authController.verifyOTPRegister);

router.post('/login', [
    check('emailOrUsername', 'Please enter a valid email or username').notEmpty(),
    check('password', 'Password is required').exists()
], authController.login);

router.post('/change-password', [
    check('emailOrUsername', 'Please enter a valid email or username').notEmpty(),
    check('oldPassword', 'Old password is required').notEmpty(),
    check('newPassword', 'New password is required').notEmpty().isLength({ min: 6 })
], authController.changePassword);

router.post('/forget-password', [
    check('email', 'Please enter a valid email').notEmpty(),
], authController.forgotPassword);

router.post('/reset-password', [
    check('email', 'Please enter a valid email').notEmpty(),
    check('newPassword', 'New password is required').notEmpty().isLength({ min: 6 })
], authController.resetPassword);

router.post('/verify-otp-login', [
    check('email', 'Please enter a valid email').notEmpty(),
    check('otp', 'Please enter the OTP').notEmpty()
], authController.verifyOTPLogin);

router.post('/profile', authController.viewProfile);

router.post('/send-email', authController.sendEmail);

module.exports = router;
