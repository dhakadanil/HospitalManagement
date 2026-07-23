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
   otp: {
        type: String,
        default: null
    },
     otpExpiry:{
        type:Number
    },
   isOtpVerified: {
    type: Boolean,
    default: false
},
 role: {
  type: String,
  unique:true,
  default: "superAdmin"
},
  refreshToken: { type: String } 

},{timestamps:true}
);

module.exports = mongoose.model("SuperAdmin",SuperadminSchema)

