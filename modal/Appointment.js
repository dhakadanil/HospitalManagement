const mongoose = require("mongoose")

const appointmentSchema = new mongoose.Schema({
   
 

},{timestamps:true})

module.exports = mongoose.model("Appointment",appointmentSchema)