const Cart = require('../models/Cart');

// Create cart if not exists
exports.createCart = async (req, res) => {
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
};

// Add food to cart
exports.addToCart = async (req, res) => {
    const { foodId, quantity } = req.body;
    if (!foodId) return res.status(400).json({ message: 'Food ID is required' });

    try {
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({
                userId: req.user.id,
                items: [{ foodId, quantity: quantity || 1 }]
            });
        } else {
            const itemIndex = cart.items.findIndex(item => item.foodId.toString() === foodId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity || 1;
            } else {
                cart.items.push({ foodId, quantity: quantity || 1 });
            }
        }

        await cart.save();
        await cart.populate('items.foodId');

        // Calculate totals
        const totalQuantity = cart.items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.items.reduce((sum, item) => {
            const price = item.foodId?.FoodPrice || 0;
            return sum + item.quantity * price;
        }, 0);

        res.status(200).json({
            message: 'Food added to cart successfully',
            cart,
            totalQuantity,
            totalPrice
        });

    } catch (error) {
        console.error("Add to cart error:", error);
        res.status(500).json({ message: 'Server error' });
    }
};

