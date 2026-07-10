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
   phone:{
    type:Number
   },
   gender:{
    type:String,
    enum:["Male","Femail"]
   },
},{timestamps:true})

module.exports = mongoose.model("Patient",patientSchema)