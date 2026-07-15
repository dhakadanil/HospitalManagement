const express = require("express");
const Appointment = require("../modal/Appointment");
const Doctor = require("../modal/Doctor");
const Patient = require("../modal/Patient");


exports.appointmentBook = async(req,res)=>{
    try{
        const {doctorId} = req.params
        const {appointmentDate,appointmentTime,reason} = req.body
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
    const myappointment = await Appointment.find({patientId})
    .populate("doctorId").populate("hospitalId");

    if(myappointment.length == 0){
        return res.status(404).json({
            msg:" Appointments Not Found"
        })
    }
    return res.status(200).json({
        success:true,
        totalappointment:myappointment.length,
        myappointment
    })
    }catch(err){
        return res.status(500).json({
            msg:"Server error"
        })
    }
}
exports.allappointment = async(req,res)=>{
    try{
   const doctorId = req.params.doctorId
   const {status} = req.query;
   if(!doctorId){
    return res.status(400).json({
        msg:"doctorId is Required"
    })
   }
   const filter={doctorId}
   if(status){
    filter.status = status
   }
   const appointments = await Appointment.find(filter)
   if(appointments.length == 0){
    return res.status(404).json({
        msg:"Appointment not found"
    })
   }
   return res.status(200).json({
     success:true,
     appointments
   })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
exports.appointmentupdatestatus = async(req,res)=>{
    try{
        if(req.user.role !== "AdminHospital"){
            return res.status(401).json({
                msg:"Only Hospital Admin Access"
            })
        }
   const {appointmentId}=req.params
   const {status}=req.body
   const appointment = await Appointment.findOne({
    _id:appointmentId,hospitalId:req.user.hospitalId})
   if(!appointment){
    return res.status(404).json({
        msg:"Appointment Not Found"
    })
   }
   const allowstatus = ["Pending","Approved","Completed","Cancel"];
   if(!allowstatus.includes(status)){
    return res.status(400).json({
        msg:"Invalid status"
    })
   }
   if(appointment.status === status){
    return res.status(400).json({
        msg:"appointment already this status"
    })
   }
   appointment.status = status  
   await appointment.save()
   return res.status(200).json({
    success:true,
    msg:"Appointment Status Update successfull",
    appointment
   })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

exports.appointmentDetail = async(req,res)=>{
    try{
        if(req.user.role !== "AdminHospital"){
            return res.status(400).json({
                msg:"Only Admin Access"
            })
        }
    const {appointmentId} = req.params
    const appointment = await Appointment.findOne({
        _id:appointmentId,hospitalId:req.user.hospitalId})
    .populate("patientId","name  email phone dateOfBirth gender")
    .populate("doctorId","name  specialization")
    .populate("hospitalId", "name address city state pincode")
    if(!appointment){
        return res.status(404).json({
            msg:"Appointment Not Found"
        })
    }
 
    return res.status(200).json({
        success:true,
        appointment
    })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}


