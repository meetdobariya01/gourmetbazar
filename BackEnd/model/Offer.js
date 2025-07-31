const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  code: String,
  description: String,
  discountPercent: Number,
  isFirstOrderOnly: Boolean
});

module.exports = mongoose.model('Offer', offerSchema);




// router.post('/order', async (req, res) => {
//   const { email, items, offerCode } = req.body;

//   let discount = 0;

//   // Check if first order
//   const previousOrders = await Order.find({ email });
//   const isFirstOrder = previousOrders.length === 0;

//   if (offerCode) {
//     const offer = await Offer.findOne({ code: offerCode.toUpperCase() });
//     if (!offer) return res.status(400).json({ error: "Invalid offer code" });

//     if (offer.isFirstOrderOnly && !isFirstOrder) {
//       return res.status(400).json({ error: "Offer only valid on first order" });
//     }

//     discount = offer.discountPercent;
//   } else if (isFirstOrder) {
//     // Apply default first order offer
//     discount = 50;
//   }

//   // Calculate total
//   let total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   let finalAmount = total - (total * discount / 100);

//   // Save Order logic...
//   res.json({ total, finalAmount, discount });
// });


