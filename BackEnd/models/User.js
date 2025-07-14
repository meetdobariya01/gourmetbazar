const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    FirstName: { type: String, required: true },
    LastName: { type: String, required: true },
    Email: {
        type: String,
        required: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    MobileNumber: {
        type: String,
        required: true,
        unique: true,
        match: /^[0-9]{10}$/
    },
    Password: {
        type: String,
        required: true,
        select: false
    },
    Role: {
        type: String,
        required: true,
        enum: ['Admin', 'User', 'Delivery'],
        default: 'User'
    },
    addresses: [String],
    otp: String,
    otpExpiry: Date
});

userSchema.pre('save', async function (next) {
    if (this.isModified('Password')) {
        this.Password = await bcrypt.hash(this.Password, 8);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);

