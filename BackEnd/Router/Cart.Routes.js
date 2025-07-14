const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticate } = require('../middleware/authMiddleware');

router.post("/create-cart", authenticate, cartController.createCart);
router.post("/add-to-cart", authenticate, cartController.addToCart);

module.exports = router;

