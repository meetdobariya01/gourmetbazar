const express = require("express");
const app = express();
const http = require("http");
const multer = require('multer');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("./model/UserSchema");
const Food = require("./model/Food.Add.Admin");
const Cart = require("./model/Cart");
const Order = require("./model/order.js");
const bodyParser = require("body-parser");
const xlsx = require("xlsx");
const fs = require("fs");
const tempOtp = {};
require("./config/db");
require("./model/Food.Add.Admin");
require("./model/Order.traking");
const cors = require('cors');
app.use(cors());
const server = http.createServer(app);
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const nodemailer = require('nodemailer');
const { type } = require("os");
// You should use environment variables for security
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER, // your email
        pass: process.env.MAIL_PASS  // your email app password
    }
});
// Multer setup
const OTP_EXPIRY_TIME = 5 * 60 * 1000;
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
// JWT authentication middleware
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // make sure this matches your login
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
const isUser = async (req, res, next) => {
    try {
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: No user found in request' });
        }

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (user.role !== 'user') {
            return res.status(403).json({ message: 'Access denied: Users only' });
        }

        req.currentUser = user;
        next();
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Admin-only middleware
const isAdmin = async (req, res, next) => {
    try {
        console.log('🔐 isAdmin called');
        console.log('📦 req.user:', req.user);
        // console.log(new Date(1752217015 * 1000).toString());
        // console.log(new Date(1752303415 * 1000).toString());
        if (!req.user || !req.user.id) {
            return res.status(401).json({ message: 'Unauthorized: No user found in request' });
        }

        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied: Admins only' });
        }

        next();
    } catch (error) {
        console.error('🛠️ isAdmin error:', error);
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};
// Delivery-only middleware
const isDelivery = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== 'delivery') return res.status(403).json({ message: 'Access denied: Delivery only' });
        next();
    } catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
};
// OTP routes
app.post("/send-otp", async (req, res) => {
    const { mobile } = req.body;

    if (!mobile) return res.status(400).json({ success: false, message: "Mobile number is required." });
    if (!/^[6-9]\d{9}$/.test(mobile)) return res.status(400).json({ success: false, message: "Invalid phone number." });

    const Otp = Math.floor(1000 + Math.random() * 9000).toString();
    tempOtp[mobile] = { Otp, expiresAt: Date.now() + OTP_EXPIRY_TIME };

    console.log(`OTP for ${mobile} is ${Otp}`);
    res.json({ success: true, message: 'OTP sent successfully.' });
});
app.post("/verify-otp", async (req, res) => {
    const { mobile, Otp } = req.body;

    if (!mobile || !Otp) return res.status(400).json({ success: false, message: "Mobile number and OTP are required." });

    const record = tempOtp[mobile];
    if (!record) return res.status(400).json({ success: false, message: "OTP not found or expired. Please request a new OTP." });
    if (record.Otp !== Otp) return res.status(400).json({ success: false, message: "Entered OTP is invalid." });
    if (Date.now() > record.expiresAt) {
        delete tempOtp[mobile];
        return res.status(400).json({ success: false, message: "OTP has expired. Please request a new OTP." });
    }

    // Mark as verified
    tempOtp[mobile].verified = true;

    res.json({ success: true, message: "OTP verified successfully." });
});
// User signup
app.post("/signup", async (req, res) => {
    const { fname, lname, email, password, mobile, role } = req.body;

    if (!fname || !lname || !email || !password || !mobile) {
        return res.status(400).json({ message: "All fields including mobile number are required" });
    }

    if (!tempOtp[mobile] || !tempOtp[mobile].verified) {
        return res.status(400).json({ message: "Mobile number not verified. Please verify OTP first." });
    }

    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: "User already exists" });

        const mobileExists = await User.findOne({ mobile });
        if (mobileExists) return res.status(400).json({ message: "Mobile number already registered" });

       const user = new User({ fname, lname, email, password, mobile, role: (role || 'user').toLowerCase() });

        await user.save();

        delete tempOtp[mobile];

        res.status(200).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Server error", details: error.message });
    }
});

// User login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Please sign up first" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ message: "Login successfully", token, role: user.role });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
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
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
// User dashboard
app.get("/user/dashboard", authenticate, async (req, res) => {
    if (req.user.role !== 'user') return res.status(403).json({ message: "Access denied: Users only" });

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
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
//Order preview
app.get('/my-orders', authenticate, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate('items.foodId');
        if (orders.length === 0) return res.status(200).json({ message: 'No orders found', orders: [] });

        res.status(200).json({ orders });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Add food (admin only)
app.post("/food-add", authenticate, isAdmin, upload.single('photo'), async (req, res) => {
    const { FoodName, FoodPrice, Description, Category,Type } = req.body;
    if (!FoodName || !FoodPrice || !Category ||!Type || !req.file) {
        return res.status(400).json({ message: "All fields and photo are required" });
    }

    try {
        const photoPath = `/uploads/${req.file.filename}`;
        const food = new Food({ FoodName, FoodPrice, Description, Category, Photos: photoPath, Type });
        await food.save();

        const filePath = path.join(__dirname, process.env.EXCEL_FILE_PATH || 'ffoods.csv');
        const foodEntry = { FoodName, FoodPrice, Description, Category, Photos: photoPath, type };
     

        let workbook, worksheet, data = [];

        if (fs.existsSync(filePath)) {
            workbook = xlsx.readFile(filePath);
            worksheet = workbook.Sheets[workbook.SheetNames[0]];
            data = xlsx.utils.sheet_to_json(worksheet);
        } else {
            workbook = xlsx.utils.book_new();
        }

        // Add SrNo
        foodEntry.SrNo = data.length + 1;
        data.push(foodEntry);

        const newSheet = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(workbook, newSheet, "Foods", true);

        try {
            xlsx.writeFile(workbook, filePath);
        } catch (err) {
            const backupPath = path.join(__dirname, `ffoods-backup-${Date.now()}.xlsx`);
            xlsx.writeFile(workbook, backupPath);
            console.warn(`Excel file saved as backup: ${backupPath}`);
        }

        res.status(201).json({ message: "Food added successfully", food });
    } catch (error) {
        console.error("Error adding food:", error);
        res.status(500).json({ error: "Server error" });
    }
});
//food type 
app.get('/foods/type/:type', async (req, res) => {
    const type = req.params.type;

    if (!['Veg', 'Non-Veg'].includes(type)) {
        return res.status(400).json({ message: 'Invalid type. Use "Veg" or "Non-Veg"' });
    }

    try {
        const foods = await Food.find({ Type: type });
        res.status(200).json({ foods });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Delete food (admin only)
app.delete("/food-delete/:id", authenticate, isAdmin, async (req, res) => {
    try {
        const deletedFood = await Food.findByIdAndDelete(req.params.id);
        if (!deletedFood) return res.status(404).json({ message: "Food not found" });

        res.status(200).json({ message: "Food deleted", deletedFood });
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
// Get all categories
app.get("/categories", async (req, res) => {
    try {
        const categories = await Food.distinct('Category');
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
// Show food by category
app.get("/foods/:Category", async (req, res) => {
    try {
        let foods = req.params.Category === "All" ? await Food.find() : await Food.find({ Category: req.params.Category });
        if (foods.length === 0) return res.status(404).json({ message: "No food found" });

        res.status(200).json(foods);
    } catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});
// Cart operations
app.post("/add-to-cart", authenticate, async (req, res) => {
    const { foodId, quantity } = req.body;
    if (!foodId) return res.status(400).json({ message: 'Food ID is required' });

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [{ foodId, quantity: quantity || 1 }] });
        } else {
            const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                cart.items.push({ foodId, quantity: quantity || 1 });
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Food added to cart successfully', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Place order API
// routes/order.js or in your main Express file
app.post('/place-order/:cartId', authenticate, async (req, res) => {
    try {
        const { cartId } = req.params;
        const {
            houseNumber, buildingName, societyName, road,
            landmark, city, pincode
        } = req.body;

        if (!city || !pincode) {
            return res.status(400).json({ message: 'Missing delivery address.' });
        }

        const cart = await Cart.findById(cartId).populate('items.foodId');
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'Cart not found or empty.' });
        }

        let totalAmount = 0;
        cart.items.forEach(item => {
            if (item.foodId?.FoodPrice) {
                totalAmount += item.quantity * item.foodId.FoodPrice;
            }
        });

        const cgst = totalAmount * 0.025;
        const sgst = totalAmount * 0.025;
        const other = totalAmount * 0.02;
        const finalAmount = totalAmount + cgst + sgst + other;

        const order = new Order({
            cartId: cart._id,
            userId: req.user.id,
            items: cart.items,
            subtotal: totalAmount,
            cgst,
            sgst,
            totalAmount: finalAmount,
            address: {
                houseNumber, buildingName, societyName, road, landmark, city, pincode
            },
            status: 'Pending',
        });

        await order.save();

        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        const user = await User.findById(req.user.id);
        if (user && user.role === 'user') {
            const billItems = cart.items.map(item => ({
                name: item.foodId.FoodName,
                price: item.foodId.FoodPrice,
                quantity: item.quantity
            }));

            const itemLines = billItems.map(item =>
                `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
            ).join('\n');

            const emailText = `
        Hello ${user.fname || 'Customer'},\n
        Thank you for your order!\n
        🧾 Order Summary:\n
        ${itemLines}\n
        ---------------------------\n
        Subtotal: ₹${totalAmount.toFixed(2)}
        CGST: ₹${cgst.toFixed(2)}
        SGST: ₹${sgst.toFixed(2)}
        Other Charges: ₹${other.toFixed(2)}
        Total: ₹${finalAmount.toFixed(2)}\n
        📍 Delivery to: ${houseNumber}, ${buildingName}, ${societyName}, ${road}, ${landmark}, ${city} - ${pincode}\n
        🕒 Status: Pending
      `;

            // ✅ Send the bill via email
            if (user.email) {
                await transporter.sendMail({
                    from: process.env.MAIL_USER,
                    to: user.email,
                    subject: '🧾 Your Food Order Receipt',
                    text: emailText
                });

                console.log(`✅ Email sent to ${user.email}`);
            }
        }

        res.status(201).json({ message: 'Order placed and bill sent (if user).', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err });
    }
});
// Create cart route
// Remove `authenticate` middleware just for testing
app.post("/create-cart", async (req, res) => {
    try {
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
            await cart.save();
        }
        res.status(200).json({ cartId: cart._id });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
});
app.get("/export/excel", (req, res) => {
    try {
        const filePath = path.join(__dirname, "ffoods.xlsx");
        const workbook = xlsx.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
        res.json(data);
    } catch (err) {
        console.error("Error reading Excel file:", err.message);
        res.status(500).send("Failed to read Excel file.");
    }
});
// Example endpoint to fetch saved addresses
app.post('/user/address', authenticate, async (req, res) => {
    try {
        const { address } = req.body;
        if (!address) return res.status(400).json({ message: 'Address is required.' });

        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ message: 'User not found.' });

        user.addresses.push(address);
        await user.save();

        res.status(201).json({ message: 'Address added successfully.', addresses: user.addresses });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Get user's cart
app.get('/cart', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.foodId');
        if (!cart) return res.status(200).json({ message: 'Cart is empty', cart: [] });

        let totalPrice = 0;
        cart.items.forEach(item => {
            if (item.foodId && item.foodId.FoodPrice) totalPrice += item.quantity * item.foodId.FoodPrice;
        });

        res.status(200).json({ cart, totalPrice });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Remove item from cart
app.delete('/cart/remove/:foodId', authenticate, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) return res.status(404).json({ message: 'Cart not found' });

        cart.items = cart.items.filter(item => item.foodId.toString() !== req.params.foodId);
        await cart.save();

        res.status(200).json({ message: 'Item removed from cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Delivery order routes
app.get("/delivery/orders", authenticate, isDelivery, async (req, res) => {
    try {
        const orders = await Order.find({ deliveryBoyId: req.user.id }); // Use find, not findById
        if (orders.length === 0) return res.status(400).json({ message: "No assigned orders found" });

        res.status(200).json({ orders });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
app.put("/delivery/order/:orderId", authenticate, isDelivery, async (req, res) => {
    const { orderId } = req.params;
    const { status } = req.body;

    try {
        const order = await Order.findOne({ _id: orderId, deliveryBoyId: req.user.id });

        if (!order) {
            return res.status(404).json({ message: "Order not found or not assigned to this delivery person." });
        }

        if (!status || !["Preparing", "Out for Delivery", "Delivered", "Cancelled"].includes(status)) {
            return res.status(400).json({ message: "Invalid or missing status." });
        }
        if (status === "cancelled") {
            order.status = "Cancelled";
            await order.save();
        }

        res.status(200).json({ message: "Order status updated successfully.", order });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
app.post("/delivery/location/:orderId", authenticate, isDelivery, async (req, res) => {
    const { orderId } = req.params;
    const { currentLocation } = req.body;

    try {
        const order = await Order.findOne({ _id: orderId, deliveryBoyId: req.user.id });
        if (!order) return res.status(404).json({ message: "Order not found or not assigned to you" });

        order.currentLocation = currentLocation;
        await order.save();

        res.status(200).json({ message: "Location updated successfully", order });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Assign order to a delivery boy
app.put('/assign-order/:orderId', authenticate, isAdmin, async (req, res) => {
    const { deliveryBoyId } = req.body;

    try {
        const order = await Order.findById(req.params.orderId);
        if (!order) return res.status(404).json({ message: 'Order not found' });

        order.deliveryBoyId = deliveryBoyId;
        await order.save();

        res.status(200).json({ message: 'Order assigned successfully', order });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});
// Start server
server.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});