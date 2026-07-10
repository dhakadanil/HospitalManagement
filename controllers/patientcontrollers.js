const Patient = require("../modal/Patient");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

exports.register = async(req,res)=>{
    try{
  const { email ,password,phone ,dateOfBirth,gender} = req.body

  const Existpatient = await Patient.findOne({email});
  if(Existpatient){
    return res.status(400).json({
        msg:"Allready Register"
    })
  }
  const hashpassword = await bcrypt.hash(password,10);
  const patient = new Patient({
    email,
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
  const {email , password,phone,dateOfBirth,gender} = req.body
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

  const token = jwt.sign({
    id:patient._id,
    email:patient.email,
    role:"Patient"
  },process.env.JWT_SECRET,{
    expiresIn:"7d"
  });
 return res.status(200).json({
    message:true,
    msg:"Login Successfull",token
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
   const {patientId} = req.user.id
   const patient = await Patient.findOne({patientId});
   if(!patient){
    return res.status(404).json({
        msg:"Patient Not Found"
    })
   }
   return res.status(200).json({
    msg:"You Profile",
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
   const {patientId} = req.user.id 
   const patient = await Patient.findByIdAndUpdate({patientId});
  
    }catch(err){
        console.log(err)
        return res.status().json({
            msg:"Server Error"
        })
    }
}