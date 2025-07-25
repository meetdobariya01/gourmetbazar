const User = require('../../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');

// Twilio config
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const client = twilio(accountSid, authToken);

const generateToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
};

// Register user
// controllers/userController.js
exports.register = async (req, res) => {
    try {
        const { firstName, lastName, email, mobileNumber, password } = req.body;

        if (!firstName || !lastName || !email || !mobileNumber || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already registered' });
        }

        const user = new User({ firstName, lastName, email, mobileNumber, password });
        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Register Error:', err);
        res.status(500).json({ error: 'Server error' });
    }

};

// Login
exports.login = async (req, res) => {
  exports.login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        const user = await User.findOne({ email, role }).select('+password');
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user);
        res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

};

// Send OTP to mobile
exports.sendOtp = async (req, res) => {
    try {
        const { MobileNumber } = req.body;
        const user = await User.findOne({ MobileNumber });
        if (!user) return res.status(404).json({ message: 'User not found' });

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const expiry = new Date(Date.now() + 10 * 60000); // 10 minutes

        user.otp = otp;
        user.otpExpiry = expiry;
        await user.save();

        await client.messages.create({
            body: `Your OTP is ${otp}`,
            from: twilioPhone,
            to: `+91${MobileNumber}` // Modify country code as needed
        });

        res.json({ message: 'OTP sent to mobile number' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// Verify OTP
exports.verifyOtp = async (req, res) => {
    try {
        const { MobileNumber, otp } = req.body;
        const user = await User.findOne({ MobileNumber });

        if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        res.json({ message: 'OTP verified successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Reset Password using mobile OTP
exports.resetPassword = async (req, res) => {
    try {
        const { MobileNumber, otp, newPassword } = req.body;
        const user = await User.findOne({ MobileNumber });

        if (!user || user.otp !== otp || new Date() > user.otpExpiry) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        user.Password = newPassword;
        user.otp = null;
        user.otpExpiry = null;
        await user.save();

        res.json({ message: 'Password reset successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

