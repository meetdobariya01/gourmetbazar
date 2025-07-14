const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const dbConnect = require("../BackEnd/config/db");
const userRoutes = require('../BackEnd/Router/userRoutes');
const adminRoutes = require('../BackEnd/Router/adminAuthRoutes');
const deliveryRoutes = require('../BackEnd/Router/deliveryAuthRoutes');
const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
const orderRoutes = require('../BackEnd/Router/Order.Routes');

app.use("/api/Cart", require('../BackEnd/Router/Cart.Routes'));
app.use('/api/orders', orderRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/delivery', deliveryRoutes);

dbConnect();
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});


