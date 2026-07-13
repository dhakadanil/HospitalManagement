const mongoose = require("mongoose")

const patientSchema  = new mongoose.Schema({
   name:{
    type:String
   },
    email:{
        type:String
    },
    password:{
        type:String
    },
    dateOfBirth:{
        type:Date,
        type:Number
    },
    otp:{
        type:String
    },
    otpExpiry:{
        type:Number
    },
    isOtpVerified: {
    type: Boolean,
    default: false
},
   phone:{
    type:Number
   },
   gender:{
    type:String,
    enum:["Male","Femail"]
   },
},{timestamps:true})

module.exports = mongoose.model("Patient",patientSchema)