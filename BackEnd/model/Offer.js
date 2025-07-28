const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  code: String,
  description: String,
  discountPercent: Number,
  isFirstOrderOnly: Boolean
});

module.exports = mongoose.model('Offer', offerSchema);
