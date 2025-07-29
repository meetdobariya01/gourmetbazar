const  mongoose = require("mongoose");

const ContectShema = new mongoose.Schema({

YourName:{
    type:String,
    required:true
},
YourEmail:{
    type: String,
    required: true,
    lowercase: true,
    unique: true
},
Subject:{
    type:String,
   required: true
},
Message:{
    type:String,
    required:true
}
});
module.exports = mongoose.model('ContectUs',ContectShema);