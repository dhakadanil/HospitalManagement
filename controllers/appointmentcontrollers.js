const express = require("express");
const Appointment = require("../modal/Appointment");
const Doctor = require("../modal/Doctor");
const Patient = require("../modal/Patient")


exports.appointmentBook = async(req,res)=>{
    try{
        const {doctorId,appointmentDate,appointmentTime,reason} = req.body
        const patientId = req.user.id
   const doctor = await Doctor.findById(doctorId);
   if(!doctor){
    return res.status(404).json({
        msg:"Doctor Not Found"
    })
   }
   console.log(doctor)
 const patient = await Patient.findById(patientId);
  if(!patient){
    return res.status(404).json({
        msg:"Patient Not Found"
    })
  }
   const appointmentDateTime = new Date(`${appointmentDate} ${appointmentTime}`);
    if (appointmentDateTime <= new Date()) {
       return res.status(400).json({
        msg: "Please select a future date and time"
    });
    }
  const patientappointment = await Appointment.findOne({
    patientId,doctorId,appointmentDate,
    appointmentTime,
    status:{$in:["Pending","Approved"]}
  })
  if(patientappointment){
    return res.status(409).json({
        msg:"already book this appointment"
    })
  }
  const thirtyday = new Date();
  thirtyday.setDate(thirtyday.getDate()+30);

  if(appointmentDateTime > thirtyday){
    return res.status(400).json({
        msg:"Appointment only with in next 30day"
    })
  }
  const alreadybook = await Appointment.findOne({
    doctorId,appointmentDate,
    appointmentTime,status:{$in:["Pending","Approved"]}
  });
  if(alreadybook){
    return res.status(409).json({
        msg:"This time slot is already book "
    })
  }
  const appointment = new Appointment({
    patientId,
    doctorId,
    hospitalId:doctor.hospitalId,
    appointmentDate,
    appointmentTime,
    reason,
    status:"Pending"
  })
  await appointment.save()
   return res.status(201).json({
    success:true,
    msg:"Appointment Pending",
    appointment
   })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
exports.myappointments = async(req,res)=>{
    try{
    const patientId =req.user.id
    const myappointment = await Appointment.find({patientId});
    if(myappointment.length == 0){
        return res.status(400).json({
            msg:"Not Appointments Found"
        })
    }
    return res.status(200).json({
        success:true,
        myappointment
    })
    }catch(err){
        return res.status(500).json({
            msg:"Server error"
        })
    }
}


