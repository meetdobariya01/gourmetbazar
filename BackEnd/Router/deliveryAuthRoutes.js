const express = require('express');
const router = express.Router();
const deliveryController = require('../../BackEnd/controllers/delivery/deliveryAuthController');

// Routes
router.post("/send-otp", deliveryController.sendOtp);
router.post("/resend-otp", deliveryController.resendOtp);
router.post("/verify-otp", deliveryController.verifyOtp);
router.post("/signup", deliveryController.DeliverySignup);
router.post("/login", deliveryController.DeliveryLogin);
router.post("/forgot-password", deliveryController.forgotPassword);

module.exports = router;
