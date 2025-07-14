const User = require('../model/User');

const isUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.Role !== 'User') {
            return res.status(403).json({ message: 'Access denied: Users only' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user || user.Role !== 'Admin') {
            return res.status(403).json({ message: 'Admins only' });
        }
        next();
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

const isDelivery = async (req,res,next) =>{
    try{
        const user = await User.findById(req.user.id);
        if(!user || user.Role !== 'Delivery'){
            return res.status(403).json({message:'Delivery Persons only'});
        }
        next();
    } catch(err){
        res.status(500).json({message:'Server error'});
    }
    };

module.exports = { isUser, isAdmin, isDelivery };

