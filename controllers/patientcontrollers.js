const Patient = require("../modal/Patient");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const sendMail = require("../utils/sendMail")

exports.register = async(req,res)=>{
    try{
  const { name,email ,password,phone ,dateOfBirth,gender} = req.body

  const Existpatient = await Patient.findOne({email});
  if(Existpatient){
    return res.status(400).json({
        msg:"Allready Register"
    })
  }
  const hashpassword = await bcrypt.hash(password,10);
  const patient = new Patient({
    name, email,
    password:hashpassword,
    phone,dateOfBirth,gender
  });
  await patient.save()
return res.status(200).json({
    msg:"Register Successfull"
})
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
exports.login = async(req,res)=>{
    try{
  const {name,email , password,phone,dateOfBirth,gender} = req.body
  const patient = await Patient.findOne({email})
  if(!patient){
    return res.status(404).json({
        msg:"Email not Found"
    })
  };
  const matchpassword = await bcrypt.compare(password,patient.password)
  if(!matchpassword){
    return res.status(401).json({
        msg:"Wrong password"
    })
  }

  const accesstoken = jwt.sign({
    id:patient._id,
    email:patient.email,
    role:"Patient"
  },process.env.JWT_SECRET,{
    expiresIn:"10m"
  });
const refreshtoken = jwt.sign({
    id:patient._id,
    email:patient.email,
    role:"Patient",
},process.env.REFRESH_SECRET,{expiresIn:"7d"})
 return res.status(200).json({
    message:true,
    msg:"Login Successfull",
    accesstoken,refreshtoken
 })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

exports.profile = async(req,res)=>{
    try{
   const patientId = req.user.id
   const patient = await Patient.findById(patientId);
   if(!patient){
    return res.status(404).json({
        msg:"Patient Not Found"
    })
   }
   return res.status(200).json({
    success:true,
    patient
   })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server error"
        })
    }
}
exports.editprofile = async(req,res)=>{
    try{
   const patientId = req.user.id 
      if(!patientId){
    return res.status(404).json({
        msg:"Data not found"
    })
   }
   const {name,email,phone,gender,dateOfBirth,} = req.body
   const dataupdate = {};
   if(name)dataupdate.name = name;
   if(email)dataupdate.email = email;
   if(phone)dataupdate.phone = phone;
   if(gender)dataupdate.gender = gender;
   if(dateOfBirth)dataupdate.dateOfBirth = dateOfBirth;
   if(Object.keys(dataupdate).length ==0){
    return res.status(400).json({
        msg:"Please Provide at one field add"
    })
   }
   const patient = await Patient.findByIdAndUpdate(patientId,
    dataupdate,{new:true}
   );
   return res.status(201).json({
    success:true,
    msg:"Data Update Successfully",
    patient
   })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

exports.forgotpassword = async(req,res)=>{
    try{
    const{email} = req.body
    const patient = await Patient.findOne({email});
    if(!patient){
        return res.status(404).json({
            msg:"email not Found"
        })
    }
    const otp = Math.floor(100000 + Math.random()*900000)
    console.log("Generated OTP:", otp);
    const hashedOtp = await bcrypt.hash(otp.toString(),10)
    patient.otp = hashedOtp
    patient.otpExpiry = Date.now()+10*60*1000   
   
    await patient.save()
    await sendMail(patient.email,otp)
    return res.status(200).json({
        success:true,
        msg:"Otp Send Successfully To your Email"
    })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
exports.VerifyOtp = async(req,res)=>{
    try{
  const {email,otp}=req.body
  const patient = await Patient.findOne({email})
  if(!patient){
    return res.status(404).json({
        msg:"Email Not Found"
    })
  }
   if(Date.now() > patient.otpExpiry){
    console.log("otp expire")
    return res.status(400).json({
        msg:"Otp Expire"
    })
  }
  const ismatch = await bcrypt.compare(otp.toString(),patient.otp)
  if(!ismatch){
    return res.status(400).json({
        msg:"invalid otp"
    })
  }
  patient.otp = null
  patient.otpExpiry = null
  patient.isOtpVerified = true;
  await patient.save()
  return res.status(200).json({
    success:true,
    patient
  })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

exports.resetpassword = async(req,res)=>{
    try{
    const {email,newPassword} = req.body
    const patient = await Patient.findOne({email});
    if(!patient){
        return res.status(404).json({
            msg:"Email Not Found"
        })
    }
    if(!patient.isOtpVerified){
        return res.status(400).json({
            msg:"Please Verify Otp First"
        })
    }
    const samepassword = await bcrypt.compare(newPassword,patient.password)
    if(samepassword){
        return res.status(400).json({
            msg:"new password can not be same as old password"
        })
    }
    const hashedpassword = await bcrypt.hash(newPassword,10)
    patient.password = hashedpassword

      patient.isOtpVerified = false;
    await patient.save()
 
    return res.status(201).json({
        seccess:true,
        msg:"change password successfull"
    })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}