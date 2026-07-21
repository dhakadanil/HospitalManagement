const express = require("express");
const Appointment = require("../modal/Appointment");
const Doctor = require("../modal/Doctor");
const Patient = require("../modal/Patient");
const sendappointmentMail = require("../utils/sendmailStatus")

exports.appointmentBook = async(req,res)=>{
    try{
        if(req.user.role !== "Patient"){
            return res.status(403).json({
                msg:"Only Patient Access"
            })
        }
        const {doctorId} = req.params
        const {appointmentDate,appointmentTime,reason} = req.body
        const patientId = req.user.id
   const doctor = await Doctor.findById(doctorId);
   if(!doctor){
    return res.status(404).json({
        msg:"Doctor Not Found"
    })
   }
 const patient = await Patient.findById(patientId);
  if(!patient){
    return res.status(404).json({
        msg:"Patient Not Found"
    })
  }
  const appointmentDateTime = new Date(`${appointmentDate}T${appointmentTime}:00`);
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
        if(req.user.role !== "Patient"){
            return res.status(403).json({
                msg:"Only patient Access"
            })
        }
    const myappointment = await Appointment.find({patientId:req.user.id})
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

// only one doctor appointment and filter by status
exports.allappointment = async(req,res)=>{
    try{
        if(req.user.role !== "AdminHospital"){
            return res.status(403).json({
                msg:"Only Hospital Admin Access"
            })
        }
   const doctorId = req.params.doctorId
   const {status} = req.query;
   if(!doctorId){
    return res.status(400).json({
        msg:"doctorId is Required"
    })
   }
   const  doctor = await Doctor.findOne({
    _id:doctorId,hospitalId:req.user.hospitalId})
   if(!doctor){
    return res.status(404).json({
        msg:"Doctor Not Found"
    })
   }
   const filter = {doctorId,hospitalId:req.user.hospitalId}
   if(status){
    filter.status = status
   }
   const appointments = await Appointment.find(filter)
   .populate("patientId","name email phone")
   .populate("doctorId","name specialization")
   if(appointments.length == 0){
    return res.status(404).json({
        msg:"Appointment not found"
    })
   }
   return res.status(200).json({
     success:true,
     totalAppointment:appointments.length,
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
   const patient = await Patient.findById(appointment.patientId);
   if(!patient){
    return res.status(404).json({
        msg:"Patient not Found"
    })
   }
   console.log("Patient:", patient);
console.log("Patient Email:", patient.email);
   appointment.status = status  
   await appointment.save()
   
   await sendappointmentMail(
    patient.email,
    appointment.status,
    appointment.appointmentDate,
    appointment.appointmentTime
)
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

// Hospital ki sabhi appointment dikhana and filter by status
exports.allappointmentstatus = async(req,res)=>{
    try{
        if(req.user.role !== "AdminHospital"){
            return res.status(403).json({
                msg:"Only Hospital Admin Access"
            })
        }
   const {hospitalId} = req.user
   const{status} = req.query
   const filter={hospitalId}
   if(status){
    filter.status = status
   }
   const appointment = await Appointment.find(filter)
   .populate("patientId" ,"name email phone")
   .populate("doctorId","name specialization")
   
   if (appointment.length === 0){
    return res.status(404).json({
        msg:"Appointment Not Found"
    })
   }

   return res.status(200).json({
    success:true,
    totalAppointment:appointment.length,
    appointment
    })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

exports.todayappointment = async(req,res)=>{
    try{
    if(req.user.role !== "AdminHospital"){
        return res.status(403).json({
            msg:"Only Hospital Admin Access"
        })
    }
    const todayDate = new Date().toISOString().split("T")[0];
    console.log(todayDate)
    const appointments = await Appointment.find({
        hospitalId:req.user.hospitalId,appointmentDate:todayDate
    }).populate("patientId","name email phone")
    .populate("doctorId","name specialization");
    if(appointments.length == 0){
        console.log("appointment not found")
        return res.status(404).json({
            msg:"Appointment Not Found"
        })
    }
    return res.status(200).json({
        success:true,
        totalAppointments: appointments.length,
        appointments
    })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

exports.searchappointmentByDate = async(req,res)=>{
    try{
   if(req.user.role !== "AdminHospital"){
    return res.status(403).json({
        msg:"Only Hospital Admin Access"
    })
   }
   const {hospitalId}= req.user
   const {date ,startDate,endDate,status} = req.query;
  const allowstatus = ["Pending","Approved","Completed","Cancel"]
if(status && !allowstatus.includes(status)){
    return res.status(400).json({
        msg:"Invalid Status"
    })
}
// date and range ek sath not allowed
 if(date&&(startDate||endDate)){
    return res.status(400).json({
        msg:"Use either date or date range,not both"
    })
   }
//    range me dono date required
if((startDate && !endDate)||(!startDate && endDate)){
    return res.status(400).json({
        msg:"both startDate and EndDate is required"
    })
}
// start date enddate se pahle ki honi chahiye 
if(startDate && endDate && startDate > endDate){
    return res.status(400).json({
        msg:"startDate Can'not be graterthen endDate"
    })
}
 const filter = {hospitalId}
   if(status){
    filter.status = status
   }
// single date and date range
  if(date){
    filter.appointmentDate = date
  }else if(startDate && endDate){
    filter.appointmentDate = {
        $gte:startDate,$lte:endDate
    }
  }
   const appointments = await Appointment.find(filter)
   .populate("patientId","name email phone")
   .populate("doctorId","name specialization")
   if(appointments.length === 0){
    return res.status(404).json({
        msg:"Appointment Not found"
    })
   }

   return res.status(200).json({
    success:true,
    totalappointments:appointments.length,
    appointments
   })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}


