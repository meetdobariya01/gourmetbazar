const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  FoodName: String,
  
FoodPrice: Number,
 
Description: String,
  Category: String,
  
Type: String,
  Photos: String,
});

module.exports = mongoose.model('FoodS', foodSchema);
