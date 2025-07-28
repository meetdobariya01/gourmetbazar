const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  category: String,
  type: String,
//   isAvailable: { type: Boolean, default: true },
//   quantity: Number,
  image: String
});

module.exports = mongoose.model('Foods', foodSchema);
