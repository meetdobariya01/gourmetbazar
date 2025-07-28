const express = require("express");
const app = express();
const http = require("http");
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file
// Import your Mongoose models
const User = require("./model/UserSchema");
const Food = require("./model/Food.Add.Admin");
const Cart = require("./model/Cart");
const Order = require("./model/order.js");
const Foods = require('./model/product.js');
require("./config/db"); // Your database connection setup
require("./model/Order.traking"); // Ensure this model is also loaded if used
require('dotenv').config();
const server = http.createServer(app);
const port = process.env.PORT || 5000;
// Middleware setup
app.use(cors()); // Enable CORS for all origins (consider restricting this in production)
app.use(express.json()); // For parsing application/json
app.use(bodyParser.json()); // For parsing application/json (redundant with express.json but often included)
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(express.static('public')); // Serve static files from 'public' directory
app.use('/uploads', express.static('uploads')); // Serve uploaded files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Ensure correct path for uploads
// In-memory storage for OTPs (for demonstration purposes)
// IMPORTANT: In a production environment, use a persistent store like Redis or a database
// for OTPs to handle server restarts and scaling.
const tempOtp = {};
const OTP_EXPIRY_TIME = 5 * 60 * 1000; // OTP valid for 5 minutes
// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
    service: 'gmail', // Use 'gmail' for Gmail SMTP
    auth: {
        user: process.env.MAIL_USER, // Your Gmail address from .env
        pass: process.env.MAIL_PASS  // Your Gmail App Password from .env
    }
});
// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Files will be stored in the 'uploads/' directory
    },
    filename: (req, file, cb) => {
        // Generate a unique filename using timestamp and original extension
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// JWT authentication middleware
const authenticate = (req, res, next) => {
    // Extract token from Authorization header (Bearer token)
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No authentication token provided.' });
    }

    try {
        // Verify the token using your JWT_SECRET from .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded user payload to the request
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};
// Middleware to check if user is a 'user' role
const isUser = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: No user ID found in token.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.role !== 'user') {
            return res.status(403).json({ message: 'Access denied: Requires user role.' });
        }

        req.currentUser = user; // Attach the full user document to the request
        next();
    } catch (error) {
        console.error('isUser middleware error:', error.message);
        res.status(500).json({ message: 'Server error during role check.', error: error.message });
    }
};
// Middleware to check if user is an 'admin' role
const isAdmin = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: No user ID found in token.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Requires admin role.' });
        }

        next();
    } catch (error) {
        console.error('isAdmin middleware error:', error.message);
        return res.status(500).json({ message: 'Server error during role check.', error: error.message });
    }
};
// Middleware to check if user is a 'delivery' role
const isDelivery = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: No user ID found in token.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.role !== 'delivery') {
            return res.status(403).json({ message: 'Access denied: Requires delivery role.' });
        }
        next();
    } catch (error) {
        console.error('isDelivery middleware error:', error.message);
        return res.status(500).json({ message: 'Server error during role check.', error: error.message });
    }
};
// --- OTP Routes (Email-based) ---
// Endpoint to send OTP via Email
app.post("/send-otp-email", async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: "Email address is required." });
    }
    // Basic server-side email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ success: false, message: "Invalid email address format." });
    }

    // Generate a 6-digit OTP for email
    const Otp = Math.floor(100000 + Math.random() * 900000).toString();
    // Store OTP using email as the key
    tempOtp[email] = { Otp, expiresAt: Date.now() + OTP_EXPIRY_TIME, verified: false };

    console.log(`Generated OTP for ${email}: ${Otp}`); // Log for debugging

    try {
        // Send email using Nodemailer
        await transporter.sendMail({
            from: process.env.MAIL_USER, // Sender email address from .env
            to: email,                     // Recipient email address
            subject: 'Your Food Delivery App OTP for Verification', // Email subject
            html: `<p>Dear User,</p>
                   <p>Your One-Time Password (OTP) for verifying your email address is: <strong>${Otp}</strong></p>
                   <p>This OTP is valid for 5 minutes. Please do not share it with anyone.</p>
                   <p>Thank you!</p>` // Email body (HTML)
        });

        res.json({ success: true, message: 'OTP sent successfully to your email address.' });

    } catch (error) {
        console.error("Error sending OTP email:", error);
        // If email sending fails, clear the stored OTP to prevent invalid verification attempts
        delete tempOtp[email];
        return res.status(500).json({ success: false, message: "Failed to send OTP email. Please ensure your email configuration is correct and try again." });
    }
});
// Endpoint to verify OTP (modified to use email instead of mobile)
app.post("/verify-otp-email", async (req, res) => {
    const { email, Otp } = req.body;

    if (!email || !Otp) {
        return res.status(400).json({ success: false, message: "Email and OTP are required." });
    }

    const record = tempOtp[email];
    if (!record) {
        return res.status(400).json({ success: false, message: "OTP not found or expired. Please request a new OTP." });
    }
    if (record.Otp !== Otp) {
        return res.status(400).json({ success: false, message: "Entered OTP is invalid." });
    }
    if (Date.now() > record.expiresAt) {
        delete tempOtp[email]; // Clean up expired OTP
        return res.status(400).json({ success: false, message: "OTP has expired. Please request a new OTP." });
    }

    // Mark as verified
    record.verified = true;
    res.json({ success: true, message: "OTP verified successfully." });
});
// --- User Authentication Routes ---
// User signup
app.post("/signup", async (req, res) => {
    const { fname, lname, email, password, mobile, role } = req.body; // Mobile is still collected for user profile

    if (!fname || !lname || !email || !password || !mobile) {
        return res.status(400).json({ message: "All fields (First Name, Last Name, Email, Password, Mobile) are required." });
    }

    // Check if the email OTP has been verified
    if (!tempOtp[email] || !tempOtp[email].verified) {
        return res.status(400).json({ message: "Email address not verified. Please verify OTP first." });
    }

    try {
        // Check if user with this email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // Check if user with this mobile number already exists
        const mobileExists = await User.findOne({ mobile });
        if (mobileExists) {
            return res.status(400).json({ message: "Mobile number already registered." });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10); // 10 salt rounds

        // Create new user instance
        const user = new User({
            fname,
            lname,
            email,
            password: hashedPassword, // Store hashed password
            mobile,
            role: (role || 'user').toLowerCase() // Default role to 'user' if not provided
        });

        await user.save(); // Save the new user to the database

        // Clean up the OTP record after successful signup
        delete tempOtp[email];

        res.status(200).json({ message: "User registered successfully." });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Server error during signup.", details: error.message });
    }
});
app.get('/foods', async (req, res) => {
    try {
        const foods = await Food.find(); // ✅ fix variable name
        res.json(foods);
    } catch (err) {
        console.error("Error fetching foods:", err);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up first." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials." });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" } // Token expires in 24 hours
        );

        res.status(200).json({ message: "Login successful.", token, role: user.role, userId: user._id });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Server error during login." });
    }
});
// -- Dashboard Routes ---
// Admin dashboard
app.get("/admin/dashboard", authenticate, isAdmin, async (req, res) => {
    try {
        // Fetch all users except passwords
        const users = await User.find().select('-password').sort({ createdAt: -1 });

        // Fetch all foods
        const foods = await Food.find();

        // Fetch all orders and populate food info
        const orders = await Order.find().populate('items.foodId').sort({ createdAt: -1 });

        // Initialize summary stats
        let totalSales = 0;
        let completedOrders = 0;
        let outForDelivery = 0;
        let cancelledOrders = 0;
        let pendingOrders = 0;

        orders.forEach(order => {
            if (order.status === 'Delivered') {
                totalSales += order.totalAmount || 0;
                completedOrders++;
            } else if (order.status === 'Out for Delivery') {
                outForDelivery++;
            } else if (order.status === 'Cancelled') {
                cancelledOrders++;
            } else {
                pendingOrders++;
            }
        });

        res.status(200).json({
            message: "Welcome to Admin Dashboard",
            totalUsers: users.length,
            totalFoods: foods.length,
            totalOrders: orders.length,
            totalSales,
            orderSummary: {
                completedOrders,
                outForDelivery,
                cancelledOrders,
                pendingOrders
            },
            users,
            foods,
            orders
        });
    } catch (error) {
        console.error("Admin dashboard error:", error);
        res.status(500).json({ message: "Server error fetching admin dashboard data." });
    }
});
// User dashboard
app.get("/user/dashboard", authenticate, isUser, async (req, res) => {
    try {
        // Fetch all available foods
        const availableFoods = await Food.find();

        // Fetch user’s previous orders
        const userOrders = await Order.find({ userId: req.user.id }).populate('items.foodId').sort({ createdAt: -1 });

        // Prepare order details with delivery status and bills
        const orderDetails = userOrders.map(order => {
            return {
                orderId: order._id,
                status: order.status,
                totalAmount: order.totalAmount,
                deliveryAddress: order.address,
                placedAt: order.createdAt,
                items: order.items.map(item => ({
                    foodName: item.foodId ? item.foodId.FoodName : 'Food Item Not Found',
                    quantity: item.quantity,
                    pricePerItem: item.foodId ? item.foodId.FoodPrice : 0
                }))
            }
        });

        res.status(200).json({
            message: "Welcome to User Dashboard",
            availableFoods,
            orders: orderDetails
        });

    } catch (error) {
        console.error("User dashboard error:", error);
        res.status(500).json({ message: "Server error fetching user dashboard data." });
    }
});
// Order preview
app.get('/my-orders', authenticate, isUser, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('items.foodId');
        if (orders.length === 0) {
            return res.status(200).json({ message: 'No orders found for this user.', orders: [] });
        }
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching user orders:", error);
        res.status(500).json({ message: 'Server error fetching orders.' });
    }
});
// --- Food Management (Admin Only) ---
// Add food (admin only)
app.post("/food-add", authenticate, isAdmin, upload.single('photo'), async (req, res) => {
    const { FoodName, FoodPrice, Description, Category, Type } = req.body;

    if (!FoodName || !FoodPrice || !Category || !Type || !req.file) {
        // Ensure all required fields and a file are present
        return res.status(400).json({ message: "All fields (FoodName, FoodPrice, Category, Type) and a photo are required." });
    }

    try {
        const photoPath = `/uploads/${req.file.filename}`; // Path to the uploaded photo
        const food = new Food({ FoodName, FoodPrice, Description, Category, Photos: photoPath, Type });
        await food.save(); // Save food item to MongoDB

        // --- Excel Export Logic ---
        const filePath = path.join(__dirname, process.env.EXCEL_FILE_PATH || 'ffoods.xlsx'); // Use .xlsx
        const foodEntry = { FoodName, FoodPrice, Description, Category, Photos: photoPath, Type }; // Use 'Type'

        let workbook, worksheet, data = [];

        if (fs.existsSync(filePath)) {
            workbook = xlsx.readFile(filePath);
            worksheet = workbook.Sheets[workbook.SheetNames[0]];
            data = xlsx.utils.sheet_to_json(worksheet);
        } else {
            workbook = xlsx.utils.book_new();
        }

        // Add SrNo to the new entry
        foodEntry.SrNo = data.length + 1;
        data.push(foodEntry);

        const newSheet = xlsx.utils.json_to_sheet(data);
        // Ensure sheet name is unique or overwrite
        xlsx.utils.book_append_sheet(workbook, newSheet, "Foods", true); // 'true' for replace

        try {
            xlsx.writeFile(workbook, filePath); // Write updated data back to Excel
        } catch (err) {
            console.warn(`Error writing to main Excel file: ${err.message}. Saving as backup.`);
            const backupPath = path.join(__dirname, `ffoods-backup-${Date.now()}.xlsx`);
            xlsx.writeFile(workbook, backupPath); // Save a backup if main write fails
            res.status(201).json({ message: "Food added to database. Excel file saved as backup due to write error.", food });
            return; // Exit here to prevent sending another response
        }

        res.status(201).json({ message: "Food added successfully to database and Excel.", food });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ error: "Server error during food addition.", details: error.message });
    }
});
// Food type filter
app.get('/foods/type/:type', async (req, res) => {
    const type = req.params.type;

    if (!['Veg', 'Non-Veg'].includes(type)) {
        return res.status(400).json({ message: 'Invalid food type. Use "Veg" or "Non-Veg".' });
    }

    try {
        const foods = await Food.find({ Type: type });
        res.status(200).json({ foods });
    } catch (error) {
        console.error("Error fetching foods by type:", error);
        res.status(500).json({ message: 'Server error fetching foods by type.' });
    }
});
// Delete food (admin only)
app.delete("/food-delete/:id", authenticate, isAdmin, async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) {
            return res.status(404).json({ message: "Food item not found." });
        }
        res.status(200).json({ message: "Food item deleted successfully.", deletedFood });
    } catch (error) {
        console.error("Error deleting food:", error);
        res.status(500).json({ error: "Server error during food deletion." });
    }
});
app.get('/foods/item/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const food = await Food.findById(id);
        if (!food) {
            return res.status(404).json({ message: 'Food not found' });
        }
        res.json(food);
    } catch (err) {
        console.error('Error fetching food by ID:', err);
        res.status(500).json({ message: 'Server error' });
    }
});
// Get all categories
app.get("/categories", async (req, res) => {
    try {
        const categories = await Food.distinct('Category');
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ message: "Server error fetching categories." });
    }
});
// Show food by category
app.get("/foods/:Category", async (req, res) => {
    try {
        let foods;
        if (req.params.Category === "All") {
            foods = await Food.find();
        } else {
            foods = await Food.find({ Category: req.params.Category });
        }

        if (foods.length === 0) {
            return res.status(404).json({ message: `No food found for category: ${req.params.Category}` });
        }
        res.status(200).json(foods);
    } catch (error) {
        console.error("Error fetching foods by category:", error);
        res.status(500).json({ error: "Server error fetching foods by category." });
    }
});
// --- Cart Operations ---
// Add food to cart
app.post("/add-to-cart", authenticate, isUser, async (req, res) => {
    const { foodId, quantity } = req.body;
    if (!foodId) {
        return res.status(400).json({ message: 'Food ID is required.' });
    }

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            // If no cart exists for the user, create a new one
            cart = new Cart({ userId: req.user.id, items: [{ foodId, quantity: quantity || 1 }] });
        } else {
            // If cart exists, check if item is already in cart
            const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
            if (itemIndex > -1) {
                // If item exists, update quantity
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                // If item does not exist, add new item to cart
                cart.items.push({ foodId, quantity: quantity || 1 });
            }
        }

        await cart.save(); // Save the updated cart
        res.status(200).json({ message: 'Food added to cart successfully.', cart });
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).json({ message: 'Server error adding to cart.' });
    }
});
// Get user's cart
app.get('/cart', authenticate, isUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.foodId');
        if (!cart || cart.items.length === 0) {
            return res.status(200).json({ message: 'Cart is empty.', cart: { items: [] }, totalPrice: 0 });
        }

        let totalPrice = 0;
        cart.items.forEach(item => {
            if (item.foodId && item.foodId.FoodPrice) {
                totalPrice += item.quantity * item.foodId.FoodPrice;
            }
        });

        res.status(200).json({ cart, totalPrice });
    } catch (error) {
        console.error("Error fetching cart:", error);
        res.status(500).json({ message: 'Server error fetching cart.' });
    }
});
// Remove item from cart
app.delete('/cart/remove/:foodId', authenticate, isUser, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user.' });
        }

        // Filter out the item to be removed
        const initialItemCount = cart.items.length;
        cart.items = cart.items.filter(item => item.foodId.toString() !== req.params.foodId);

        if (cart.items.length === initialItemCount) {
            return res.status(404).json({ message: 'Food item not found in cart.' });
        }

        await cart.save(); // Save the updated cart

        res.status(200).json({ message: 'Item removed from cart successfully.', cart });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: 'Server error removing item from cart.' });
    }
});
// Create cart route (Note: This route might be redundant if add-to-cart handles creation)
// Consider if this is truly needed or if `add-to-cart` should be the primary way to ensure a cart exists.
app.post("/create-cart", authenticate, isUser, async (req, res) => { // Added authenticate, isUser
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
            await cart.save();
        }
        res.status(200).json({ cartId: cart._id, message: "Cart created or already exists." });
    } catch (err) {
        console.error("Error creating cart:", err);
        res.status(500).json({ message: "Server error creating cart." });
    }
});
// --- Order Management ---
// Place order API
app.post('/place-order/:cartId', authenticate, isUser, async (req, res) => {
    try {
        const { cartId } = req.params;
        const {
            houseNumber, buildingName, societyName, road,
            landmark, city, pincode
        } = req.body;

        if (!city || !pincode || !houseNumber) { // Added houseNumber as required for minimum address
            return res.status(400).json({ message: 'Missing essential delivery address details (house number, city, pincode).' });
        }

        const cart = await Cart.findById(cartId).populate('items.foodId');
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'Cart not found or empty.' });
        }

        let subtotal = 0;
        cart.items.forEach(item => {
            if (item.foodId?.FoodPrice) {
                subtotal += item.quantity * item.foodId.FoodPrice;
            }
        });

        // Calculate taxes and other charges
        const cgst = subtotal * 0.025;
        const sgst = subtotal * 0.025;
        const other = subtotal * 0.02; // Assuming 2% other charges
        const finalAmount = subtotal + cgst + sgst + other;

        const order = new Order({
            cartId: cart._id,
            userId: req.user.id,
            items: cart.items,
            subtotal: subtotal,
            cgst,
            sgst,
            totalAmount: finalAmount,
            address: {
                houseNumber, buildingName, societyName, road, landmark, city, pincode
            },
            status: 'Pending', // Initial status
        });

        await order.save(); // Save the new order

        // Clear the user's cart after placing the order
        cart.items = [];
        // cart.totalPrice = 0; // Assuming totalPrice is a field in Cart schema
        await cart.save();

        const user = await User.findById(req.user.id);
        if (user && user.email) { // Ensure user and email exist
            const billItems = cart.items.map(item => ({ // This will be empty as cart.items was cleared
                name: item.foodId ? item.foodId.FoodName : 'Unknown Food',
                price: item.foodId ? item.foodId.FoodPrice : 0,
                quantity: item.quantity
            }));

            // To send the bill, you need to use the `items` from the `order` object, not the cleared `cart`
            const orderItemsForEmail = order.items.map(item => ({
                name: item.foodId ? item.foodId.FoodName : 'Unknown Food',
                price: item.foodId ? item.foodId.FoodPrice : 0,
                quantity: item.quantity
            }));


            const itemLines = orderItemsForEmail.map(item =>
                `<li>${item.name} x ${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}</li>`
            ).join('');

            const emailHtml = `
                <p>Hello ${user.fname || 'Customer'},</p>
                <p>Thank you for your order! Here's a summary of your recent purchase:</p>
                <h3>🧾 Order Summary (Order ID: ${order._id})</h3>
                <ul>
                    ${itemLines}
                </ul>
                <hr/>
                <p>Subtotal: ₹${subtotal.toFixed(2)}</p>
                <p>CGST (2.5%): ₹${cgst.toFixed(2)}</p>
                <p>SGST (2.5%): ₹${sgst.toFixed(2)}</p>
                <p>Other Charges (2%): ₹${other.toFixed(2)}</p>
                <h3>Total Amount: ₹${finalAmount.toFixed(2)}</h3>
                <p><strong>📍 Delivery to:</strong><br/>
                   ${houseNumber}, ${buildingName || ''}, ${societyName || ''}, ${road || ''}, ${landmark || ''}, ${city} - ${pincode}</p>
                <p><strong>🕒 Status:</strong> ${order.status}</p>
                <p>We will notify you once your order is out for delivery.</p>
                <p>Thank you for choosing our service!</p>
                <p>Best regards,<br/>Your Food Delivery Team</p>
            `;

            // Send the bill via email
            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: user.email,
                subject: `🧾 Your Food Order Receipt - Order #${order._id}`,
                html: emailHtml // Use HTML for a nicely formatted email
            });

            console.log(`✅ Order confirmation email sent to ${user.email}`);
        }

        res.status(201).json({ message: 'Order placed successfully and confirmation email sent.', order });
    } catch (err) {
        console.error("Error placing order:", err);
        res.status(500).json({ message: 'Server error placing order.', error: err.message });
    }
});
// --- Excel Export ---
app.get('/search', async (req, res) => {
    const query = req.query.query;
    if (!query) {
        return res.status(400).json({ error: 'Query is required' });
    }

    try {
        const results = await Food.find({
            FoodName: { $regex: query, $options: 'i' } // case-insensitive search
        });

        res.json(results);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});
// Endpoint to export food data to Excel
app.get("/export/excel", (req, res) => {
    try {
        const filePath = path.join(__dirname, process.env.EXCEL_FILE_PATH || "ffoods.xlsx");
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "Excel file not found." });
        }
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        res.json(data);
    } catch (err) {
        console.error("Error reading Excel file:", err.message);
        res.status(500).send("Failed to read Excel file.");
    }
});
// Example endpoint to add saved addresses
app.post('/user/address', authenticate, isUser, async (req, res) => {
    try {
        const { address } = req.body; // Expecting an address object
        if (!address || typeof address !== 'object') {
            return res.status(400).json({ message: 'Valid address object is required.' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Add the new address to the user's addresses array
        user.addresses.push(address);
        await user.save();

        res.status(201).json({ message: 'Address added successfully.', addresses: user.addresses });
    } catch (error) {
        console.error("Error adding user address:", error);
        res.status(500).json({ message: 'Server error adding address.' });
    }
});
// Get orders assigned to a delivery boy
app.get("/delivery/orders", authenticate, isDelivery, async (req, res) => {
    try {
        // Find orders specifically assigned to the authenticated delivery boy
        const orders = await Order.find({ deliveryBoyId: req.user.id }).populate('userId', 'fname lname email mobile').populate('items.foodId');
        if (orders.length === 0) {
            return res.status(200).json({ message: "No assigned orders found for this delivery person.", orders: [] });
        }
        res.status(200).json({ orders });
    } catch (error) {
        console.error("Error fetching delivery orders:", error);
        res.status(500).json({ message: "Server error fetching delivery orders." });
    }
});
// Update order status by delivery boy
app.put("/delivery/order/:orderId", authenticate, isDelivery, async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        // Find the order and ensure it's assigned to the current delivery boy
        const order = await Order.findOne({ _id: orderId, deliveryBoyId: req.user.id });

        if (!order) {
            return res.status(404).json({ message: "Order not found or not assigned to this delivery person." });
        }

        // Validate the new status
        const validStatuses = ["Preparing", "Out for Delivery", "Delivered", "Cancelled"];
        if (!status || !validStatuses.includes(status)) {
            return res.status(400).json({ message: `Invalid or missing status. Must be one of: ${validStatuses.join(', ')}.` });
        }

        order.status = status; // Update the order status
        await order.save(); // Save changes

        res.status(200).json({ message: "Order status updated successfully.", order });
    } catch (error) {
        console.error("Error updating delivery order status:", error);
        res.status(500).json({ message: "Server error updating order status." });
    }
});
// Update delivery location (for tracking)
app.post("/delivery/location/:orderId", authenticate, isDelivery, async (req, res) => {
    const { orderId } = req.params;
    const { currentLocation } = req.body; // Expecting an object { lat: number, lng: number } or string

    try {
        const order = await Order.findOne({ _id: orderId, deliveryBoyId: req.user.id });
        if (!order) {
            return res.status(404).json({ message: "Order not found or not assigned to you." });
        }

        order.currentLocation = currentLocation; // Update the location field
        await order.save();

        res.status(200).json({ message: "Delivery location updated successfully.", order });
    } catch (error) {
        console.error("Error updating delivery location:", error);
        res.status(500).json({ message: 'Server error updating location.' });
    }
});
// Assign order to a delivery boy (Admin only)
app.put('/assign-order/:orderId', authenticate, isAdmin, async (req, res) => {
    const { deliveryBoyId } = req.body;
    if (!deliveryBoyId) {
        return res.status(400).json({ message: 'Delivery Boy ID is required.' });
    }
    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        // Optional: Verify if deliveryBoyId corresponds to an actual 'delivery' role user
        const deliveryBoy = await User.findById(deliveryBoyId);
        if (!deliveryBoy || deliveryBoy.role !== 'delivery') {
            return res.status(400).json({ message: 'Invalid Delivery Boy ID or user is not a delivery person.' });
        }
        order.deliveryBoyId = deliveryBoyId;
        order.status = 'Assigned'; // Update status to reflect assignment
        await order.save();

        res.status(200).json({ message: 'Order assigned successfully to delivery boy.', order });
    } catch (error) {
        console.error("Error assigning order:", error);
        res.status(500).json({ message: 'Server error assigning order.' });
    }
});
// Start server
server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
