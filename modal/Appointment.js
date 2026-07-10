const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
   patientId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Patient"
   },
   doctorId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Doctor"
   },
   hospitalId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Hospital"
   },
   appointmentDate:{
    type:String
   },
   appointmentTime:{
    type:String
   },
   reason:{
    type:String
   },
   status:{
    type:String,
    enum:["Pending","Approved","Completed","Cancel"],
    default:"Pending"
   }
 

},{timestamps:true})

module.exports = mongoose.model("Appointment",appointmentSchema)