const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const { tempOtp, OTP_EXPIRY_TIME } = require('../../utils/otpManager');


// Send OTP
exports.sendOtp = (req, res) => {
    const { mobile } = req.body;
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
        return res.status(400).json({ message: "Invalid mobile number" });
    }

    const Otp = Math.floor(1000 + Math.random() * 9000).toString();
    tempOtp[mobile] = { Otp, expiresAt: Date.now() + OTP_EXPIRY_TIME, verified: false };

    console.log(`✅ OTP for ${mobile} is ${Otp}`);
    res.json({ message: 'OTP sent successfully' });
};

// Resend OTP
exports.resendOtp = (req, res) => {
    const { mobile } = req.body;
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
        return res.status(400).json({ message: "Invalid mobile number" });
    }

    const Otp = Math.floor(1000 + Math.random() * 9000).toString();
    tempOtp[mobile] = { Otp, expiresAt: Date.now() + OTP_EXPIRY_TIME, verified: false };

    console.log(`✅ Resent OTP for ${mobile} is ${Otp}`);
    res.json({ message: 'OTP resent successfully' });
};

// Verify OTP
exports.verifyOtp = (req, res) => {
    const { mobile, Otp } = req.body;
    const record = tempOtp[mobile];

    if (!record || Date.now() > record.expiresAt) {
        delete tempOtp[mobile];
        return res.status(400).json({ message: "OTP expired or invalid" });
    }

    if (record.Otp !== Otp) {
        return res.status(400).json({ message: "Incorrect OTP" });
    }

    tempOtp[mobile].verified = true;
    res.json({ message: "OTP verified successfully" });
};

// Delivery Signup
exports.DeliverySignup = async (req, res) => {
    const { fname, lname, email, password, mobile } = req.body;

    if (!fname || !lname || !email || !password || !mobile) {
        return res.status(400).json({ message: "All fields are required" });
    }

    if (!tempOtp[mobile]?.verified) {
        return res.status(400).json({ message: "Mobile number not verified" });
    }

    try {
        const emailExists = await User.findOne({ Email: email });
        const mobileExists = await User.findOne({ MobileNumber: mobile });

        if (emailExists) return res.status(400).json({ message: "Email already registered" });
        if (mobileExists) return res.status(400).json({ message: "Mobile already registered" });

        const newUser = new User({
            FirstName: fname,
            LastName: lname,
            Email: email,
            MobileNumber: mobile,
            Password: password,
            Role: 'Delivery'
        });

        await newUser.save();
        delete tempOtp[mobile];

        res.status(201).json({ message: "Delivery user registered successfully" });
    } catch (err) {
        console.error("Delivery signup error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Delivery Login
exports.DeliveryLogin = async (req, res) => {
   const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    try {
        const user = await User.findOne({ Email: email, Role: 'Delivery' }).select('+Password');
        if (!user) return res.status(404).json({ message: "Delivery user not found" });

        const isMatch = await bcrypt.compare(password, user.Password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: `${user.FirstName} ${user.LastName}`,
                email: user.Email,
                mobile: user.MobileNumber,
                role: user.Role
            }
        });
    } catch (err) {
        console.error("Delivery login error:", err);
        res.status(500).json({ message: "Server error" });
    }
};

// Forgot Password
exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    try {
        const user = await User.findOne({ Email: email, Role: 'Delivery' });
        if (!user) return res.status(404).json({ message: "Delivery user not found" });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
        const resetLink = `${req.protocol}://${req.get('host')}/reset-password/${token}`;
        await sendEmail(email, resetLink);

        res.json({ message: "Reset password link sent successfully" });
    } catch (err) {
        console.error("Forgot password error:", err);
        res.status(500).json({ message: "Server error" });
    }
};
