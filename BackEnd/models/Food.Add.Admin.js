
const  mongoose = require("mongoose");

const FoodShema = new mongoose.Schema({
    FoodName:{
        type:String,
        require:true
    },
    FoodPrice:{
        type:Number,
        required:true
    },
    Description:{
        type:String,
        required:true 
    },
    Category:{
        type:String,
        required:true
    },
    Photos:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        enum:['Veg', 'Non-Veg'],
        default:'Veg',
        required:true
    },
});
module.exports = mongoose.model('Food', FoodShema);
