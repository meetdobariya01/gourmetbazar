const express = require('express');
const router = express.Router();
const { placeOrder } = require('../controllers/orderController');
const { authenticate } = require('../middleware/authMiddleware');

router.post('/place-order/:cartId', authenticate, placeOrder);

module.exports = router;

