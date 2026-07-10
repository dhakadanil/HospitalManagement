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
        type:Number
    },
   phone:{
    type:Number
   },
   gender:{
    enum:["Mail","Femail"]
   },
   isVerified:{
    type:Boolean,
    default:false
   }
},{timestamps:true})

module.exports = mongoose.model("Patient",patientSchema)