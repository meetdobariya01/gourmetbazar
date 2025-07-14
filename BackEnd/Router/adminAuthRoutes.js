const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin/adminAuthController');

// OTP routes
router.post("/send-otp", adminController.sendOtp);
router.post("/resend-otp", adminController.resendOtp);
router.post("/verify-otp", adminController.verifyOtp);

// Admin auth routes
router.post("/signup", adminController.adminSignup);
router.post("/login", adminController.adminLogin);
router.post("/forgot-password", adminController.forgotPassword);

module.exports = router;

