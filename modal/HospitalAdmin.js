const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
   name:{
    type:String
   },
    email:{
        type:String,
        unique:true
    },
    phone:{
        type:Number
    },
    password:{
        type:String
    },
    otp:{
        type:Number
    },
     otpExpire:{
    type:Date,
    default:null
 },
 isVerified:{
    type:Boolean,
    default:false
 },
    role:{
        type:String,
        default:"AdminHospital"
    },
    hospitalId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true
}

},{timestamps:true}
);

module.exports = mongoose.model("HospitalAdmin",AdminSchema)

