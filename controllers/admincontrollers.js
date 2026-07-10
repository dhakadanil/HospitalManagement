const HospitalAdmin = require("../modal/HospitalAdmin");
const Hospital = require("../modal/Hospital")
const sendMail = require("../utils/sendMail")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.HospitalAdminRegister = async (req,res)=>{
  try{
    if(req.user.role !== "superAdmin"){
        return res.status(403).json({
          msg:"Only Super Admin Access"})
        }
const {name,email,password,phone,hospitalId} = req.body
console.log(req.body);
const existingAdmin  = await HospitalAdmin.findOne({email});
if(existingAdmin ){
return res.status(403).json({
    msg:"Hospital Admin Allready Registered"
})
};
const existhospitaladmin = await HospitalAdmin.findOne({hospitalId})
if(existhospitaladmin){
    return res.status(400).json({
        msg:"this hospital already admin"
    })
}
const hospital = await Hospital.findById(hospitalId)
if(!hospital){
    return res.status(404).json({
        msg:"Hospital Not Found"
    })
}

const hashedpassword = await bcrypt.hash(password,10)
const otp =  Math.floor(100000+Math.random()*900000);
console.log("Otp",otp)
const otpExpire = Date.now()+5*60*1000;

const hospitaladmin = new HospitalAdmin({
name,email ,
 password:hashedpassword ,
 phone,hospitalId,
 otp,otpExpire,
 role:"AdminHospital",
});
await hospitaladmin.save();
await sendMail(hospitaladmin.email,otp)
return res.status(200).json({
    success:true,
    msg:"Otp Send Successfully"
})
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}
exports.HospitaladminVerifiOtp = async(req,res)=>{
    try{
    console.log(req.body)
const {email,otp} =req.body
const hospitaladmin = await HospitalAdmin.findOne({email})
if(!hospitaladmin){
  return res.status(404).json({
    msg:"Hospital admin Email Not Found"
  })
}
if(hospitaladmin.isVerified){
    return res.status(400).json({
        msg:"Email Already Verified"
    })
}
if(Date.now() > hospitaladmin.otpExpire){
    console.log("Otp Expire")
    return res.status(400).json({
        msg:"Otp Expire"
    })
}
if(hospitaladmin.otp !== Number(otp)){
    return res.status(400).json({
        msg:"Invalid Otp"
    })
}
hospitaladmin.isVerified= true
hospitaladmin.otp = null
hospitaladmin.otpExpire = null
await hospitaladmin.save()
return res.status(200).json({
    msg:"Verify Otp Successfully"
})
}catch(err){
    console.log(err)
    return res.status(500).json({
        msg:"Server Error"
    })
}
}

exports.Hospitaladminlogin = async (req,res)=>{
    try{
          if(req.user.role !== "superAdmin"){
            return res.status(403).json({
                msg:"Only Super Admin Access"
            })
        }
    const {email , password} = req.body
    const hospitaladmin = await HospitalAdmin.findOne({email});
    if(!hospitaladmin){
        return res.status(404).json({
            msg:"Email Not Found"
        })
    }
    const matchpassword =await bcrypt.compare(password,hospitaladmin.password);
    if(!matchpassword){
        return res.status(400).json({
            msg:"Wrong Password"
        })
    }
    const token = jwt.sign({
    id:hospitaladmin._id,
    email:hospitaladmin.email,
    role:hospitaladmin.role,
    hospitalId:hospitaladmin.hospitalId
},process.env.JWT_SECRET,{
    expiresIn:"1d"
});
 return res.status(200).json({
        msg:"Admin Login Successfull",token:token
    })
}catch(err){
    console.log(err)
    return res.status(500).json({
        msg:"Server Error"
    })
}
 }


 exports.hospitalAdminprofile = async (req,res)=>{
    try{
if(req.user.role !== "AdminHospital"){
    return res.status(400).json({
        msg:"Only Admin Access"
    })
}
const{hospitalId} = req.query;
if(hospitalId && hospitalId !== req.user.hospitalId.toString()){
    return res.status(403).json({
        message:false,
        msg:"you are not allow access another hospital"
    })
}
const admin  = await HospitalAdmin.findById(req.user.id).populate("hospitalId");
if(!admin){
    return res.status(404).json({
        msg:"Admin Not found"
    })
}
return res.status(200).json({
    success:true,
    admin
})
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
 }