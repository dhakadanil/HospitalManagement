const Appointment = require("../modal/Appointment");
const Doctor = require("../modal/Doctor");
const jwt = require("jsonwebtoken");
exports.addDoctor = async(req,res)=>{
    try{
     console.log(req.user)
   if(req.user.role !== "AdminHospital"){
    return res.status(403).json({
        msg:"Doctor Add Only Admin Access"
    })
   };
   const {name , email,phone,gender,age,specialization,experience} = req.body
   console.log(req.body)
   const hospitalId = req.user.hospitalId
   const doctorexist = await Doctor.findOne({email,hospitalId});
if(doctorexist){
    return res.status(400).json({
        msg:"Doctor allready add"
    })
}
   const doctor = new Doctor({
   name,email,phone,age,gender,
   specialization,experience,hospitalId
   })
   await doctor.save()
      res.status(200).json({
    success:true,
    msg:"Doctor Add Successfully"
   })
    }catch(err){
    console.log(err)
    return res.status(500).json({
        msg:"Server error"
    })
    }
}
exports.alldoctor = async(req,res)=>{
    try{
     if(req.user.role !== "AdminHospital"){
        return res.status(403).json({
            msg:"Only Admin Access"
        })
     }
     const doctor = await Doctor.find({hospitalId:req.user.hospitalId})
     if(!doctor){
        return res.status(404).json({
            msg:"Doctor not Found"
        })
     }
     return res.status(200).json({
        success:true,
        doctor
     })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            mgs:"Server error"
        })
    }
}
exports.singledoctordetail = async(req,res)=>{
    try{
        if(req.user.role !== "AdminHospital"){
            return res.status(403).json({
                msg:"Only Admin Access"
            })
        }
   const doctor = await Doctor.findOne({
    _id:req.params.id,hospitalId:req.user.hospitalId})
    if(!doctor){
        return res.status(404).json({
            msg:"Doctor Not Found"
        })
    }
    return res.status(200).json({
        success:true,
        doctor
    })
    }catch(error){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
exports.editdoctor = async(req,res)=>{
    try{
    if(req.user.role !== "AdminHospital"){
        return res.status(403).json({
            msg:"Only Admin Access"
        })
    }
const { name,email,phone,age,gender,specialization,experience} = req.body
    const {id} = req.params
    const doctors = await Doctor.findOne({_id:id,hospitalId:req.user.hospitalId})
    if(!doctors){
        return res.status(403).json({
            msg:"Not Allowed"
        })
    }
    const doctor = await Doctor.findByIdAndUpdate(id,{
        name,email,phone,age,gender,specialization,experience,
    },{new:true})

    if(!doctor){
        return res.status(404).json({
            msg:"Doctor not found"
        })
    }
  res.status(200).json({
    success:true,
    doctor
  })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
exports.deletedoctor = async(req,res)=>{
    try{
   if(req.user.role !== "AdminHospital"){
    return res.status(403).json({
        msg:"Only Admin Access"
    })
}
    const doctor = await Doctor.findOneAndDelete({
        _id:req.params.id,hospitalId:req.user.hospitalId})
   if(!doctor){
    return res.status(404).json({
        msg:"Doctor Not Found"
    })
   }
    
console.log(doctor)
return res.status(200).json({
    success:true,doctor
})
    }catch(err){
        console.log(err)
        msg:"Server Error"
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
   const {appointmentId}=req.params
   const {status}=req.body
   const appointment = await Appointment.findById(appointmentId)
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
   appointment.status = status  
   await appointment.save()
   return res.status(201).json({
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
    const {appointmentId} = req.params
    const appointment = await Appointment.findById(appointmentId)
    .populate("patientId","name  email phone dateOfBirth gender")
    .populate("doctorId","name  specialization")
    .populate("hospitalId", "name address city state pincode")
    if(!appointment){
        return res.status(404).json({
            msg:"Appointment Not Found"
        })
    }
     if (appointment.patientId._id.toString() !== req.user.id) {
    return res.status(403).json({
        msg: "Access denied"
    });
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

