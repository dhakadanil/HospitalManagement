const Doctor = require("../modal/Doctor");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")


// hospitalAdmin
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
     return res.status(201).json({
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
     if(doctor.length == 0){
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
        const {id} = req.params
   const doctor = await Doctor.findOne({
   _id:id,hospitalId:req.user.hospitalId})
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
    const {id} = req.params
    const doctors = await Doctor.findOne({_id:id,hospitalId:req.user.hospitalId})
    if(!doctors){
        return res.status(404).json({
            msg:"Doctor Not Found"
        })
    }
    const { name,email,phone,age,gender,specialization,experience} = req.body
    
    const updatedata ={}
    if(name)updatedata.name = name;
    if(email)updatedata.email = email;
    if(phone)updatedata.phone = phone;
    if(age)updatedata.age = age;
    if(gender)updatedata.gender = gender;
    if(specialization)updatedata.specialization = specialization;
    if(experience)updatedata.experience = experience
    if(Object.keys(updatedata).length == 0){
        return res.status(400).json({
            msg:"Please Provide at one filed add"
        })
    }
    const doctor = await Doctor.findByIdAndUpdate(id,updatedata,{new:true})

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
    success:true,doctor,
    msg:"Doctor Delete Successfully"
})
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
// patient 
exports.patientselecthospitalindoctor = async(req,res)=>{
    try{
        if(req.user.role !== "Patient"){
            return res.status(403).json({
                msg:"Only Patient Access"
            })
        }
     const {hospitalId} = req.params
     const doctors = await Doctor.find({hospitalId})
     if(doctors.length === 0){
        return res.status(404).json({
            msg:"Docotr Not found"
        })
     }
     return res.status(200).json({
        success:true,
        totalDoctors:doctors.length,
        doctors
     })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

exports.searchDoctorsBySpecialization = async(req,res)=>{
    try{
        if(req.user.role !== "Patient"){
            return res.status(403).json({
                msg:"Only Patient Access"
            })
        }
    const {specialization} = req.query
    const doctors = await Doctor.find({specialization:{$regex:`^${specialization}$`,$options: "i"}})
    if(doctors.length === 0){
        return res.status(404).json({
            msg:"Doctor Not Found"
        })
    }
    return res.status(200).json({
        success:true,
        totalDoctors:doctors.length,
        doctors
    })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}




