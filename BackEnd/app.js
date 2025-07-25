const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbConnect = require("../BackEnd/config/db");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ CORS MUST COME BEFORE routes
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));

app.use(express.json());

// ✅ Register your routes after CORS
app.use("/api/Cart", require('../BackEnd/Router/Cart.Routes'));
app.use('/api/orders', require('../BackEnd/Router/Order.Routes'));
app.use('/api/user', require('../BackEnd/Router/userRoutes'));
app.use('/api/admin', require('../BackEnd/Router/adminAuthRoutes'));
app.use('/api/delivery', require('../BackEnd/Router/deliveryAuthRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

dbConnect();
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
