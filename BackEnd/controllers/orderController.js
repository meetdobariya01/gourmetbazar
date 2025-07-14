const Cart = require('../models/Cart');
const Order = require('../models/Order');
const User = require('../models/User');
const transporter = require('../utils/mailer');

exports.placeOrder = async (req, res) => {
    try {
        const { cartId } = req.params;
        const {
            houseNumber, buildingName, societyName, road,
            city, pincode
        } = req.body;

        if (!city || !pincode) {
            return res.status(400).json({ message: 'Missing delivery address.' });
        }

        const cart = await Cart.findById(cartId).populate('items.foodId');
        if (!cart || cart.items.length === 0) {
            return res.status(404).json({ message: 'Cart not found or empty.' });
        }

        // Calculate subtotal
        let totalAmount = 0;
        cart.items.forEach(item => {
            if (item.foodId?.FoodPrice) {
                totalAmount += item.quantity * item.foodId.FoodPrice;
            }
        });

        // Tax and final amount
        const cgst = totalAmount * 0.025;
        const sgst = totalAmount * 0.025;
        const other = totalAmount * 0.02;
        const finalAmount = totalAmount + cgst + sgst + other;

        // Create order
        const order = new Order({
            cartId: cart._id,
            userId: req.user.id,
            items: cart.items,
            subtotal: totalAmount,
            cgst,
            sgst,
            totalAmount: finalAmount,
            address: {
                houseNumber, buildingName, societyName, road, city, pincode
            },
        });

        await order.save();

        // Clear cart
        cart.items = [];
        cart.totalPrice = 0;
        await cart.save();

        // Send email receipt
        const user = await User.findById(req.user.id);
        if (user && user.Role === 'user' && user.Email) {
            const billItems = cart.items.map(item => ({
                name: item.foodId.FoodName,
                price: item.foodId.FoodPrice,
                quantity: item.quantity
            }));

            const itemLines = billItems.map(item =>
                `${item.name} x ${item.quantity} = ₹${item.price * item.quantity}`
            ).join('\n');

            const emailText = `
Hello ${user.fname || 'Customer'},

Thank you for your order!

🧾 Order Summary:
${itemLines}
---------------------------
Subtotal: ₹${totalAmount.toFixed(2)}
CGST: ₹${cgst.toFixed(2)}
SGST: ₹${sgst.toFixed(2)}
Other Charges: ₹${other.toFixed(2)}
Total: ₹${finalAmount.toFixed(2)}

📍 Delivery to: ${houseNumber}, ${buildingName}, ${societyName}, ${road}, ${city} - ${pincode}
`;

            await transporter.sendMail({
                from: process.env.MAIL_USER,
                to: user.Email,
                subject: '🧾 Your Food Order Receipt',
                text: emailText
            });

            console.log(`✅ Email sent to ${user.Email}`);
        }

        res.status(201).json({ message: 'Order placed and bill sent (if user).', order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

