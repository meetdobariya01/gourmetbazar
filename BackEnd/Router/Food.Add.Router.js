const express = require('express');
const multer = require('multer');
const path = require('path');
const { authenticate } = require('../middleware/authMiddleware');
const { isAdmin } = require('../middleware/Roles');
const foodController = require('../controllers/foodController');

const router = express.Router();

// Multer setup
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

// Routes
router.post("/add", authenticate, isAdmin, upload.single('photo'), foodController.addFood);
router.get("/", authenticate, foodController.getAllFoods);
router.delete("/delete/:id", authenticate, isAdmin, foodController.deleteFood);

module.exports = router;

