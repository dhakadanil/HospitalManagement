const mongoose = require("mongoose");

const SuperadminSchema = new mongoose.Schema({
   name:{
    type:String
   },
 email:{
    type:String
 },
 password:{
    type:String
 },
 otp:{
  type:Number,
  default:null
 },
 otpExpire:{
    type:Date,
    default:null
 },
 isVerified:{
    type:Boolean,
    default:false
 },
 role: {
  type: String,
  unique:true,
  default: "superAdmin"
}

},{timestamps:true}
);

module.exports = mongoose.model("SuperAdmin",SuperadminSchema)

