const SuperAdminModel  = require("../modal/SuperAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail")
exports.SuperAdminregister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const exitsuper = await SuperAdminModel.findOne({ email });
    if (exitsuper) {
      return res.status(400).json({
        msg: "email already registered",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const otp = Math.floor(100000+Math.random()*900000).toString()
    console.log("Ganrated otp :" ,otp)
    const hashedOtp = await bcrypt.hash(otp,10);
    const otpExpiry = Date.now()+(30*1000)
    const superadmin = new SuperAdminModel({
      name,
      email,
      password: hashedpassword,
       role: "superAdmin",
       otp:hashedOtp,
       otpExpiry
    });
    await superadmin.save();
    await sendMail(email,otp)
    return res.status(201).json({
      success: true,
      msg: "Register Successfully And Please Verify the Otp Send your Email",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
exports.SuperAdminlogin = async(req,res)=>{
  try{
  const {email ,password} = req.body
  console.log(req.body);
  const superadmin = await SuperAdminModel.findOne({email});
  if(!superadmin){
    return res.status(404).json({
      msg:"Admin Email not found"
    })
  }
  if(!superadmin.isOtpVerified){
    return res.status(400).json({
      msg:'Please Verify Otp First'
    })
  }
 const matchpassword = await bcrypt.compare(password,superadmin.password);
  if(!matchpassword){
  console.log("wrong Password");
  return res.status(400).json({
    msg:"Wrong Password"
  })
  }
const token = jwt.sign({
    id:superadmin._id,
    email:superadmin.email,
    role:superadmin.role
   },process.env.JWT_SECRET,{
    expiresIn:"1d"
   });
return res.status(200).json({
    msg:"Login Successfull",
        token: token
});

  }catch(err){
    console.log(err)
    return res.status(500).json({
      msg:"Server Error"
    })
  }
}
exports.forgotpassword = async(req,res)=>{
  try{
    const {email} = req.body
    const superadmin = await SuperAdminModel.findOne({email})
    if(!superadmin){
      return res.status(404).json({
        msg:"Email not found"
      })
    }
    const otp = Math.floor(100000+Math.random()*900000)
    console.log(otp)
    const hashedOtp =await  bcrypt.hash(otp.toString(),10)
    superadmin.otp = hashedOtp
    superadmin.otpExpiry = Date.now()+(30*1000)
    await superadmin.save();
    await sendMail(superadmin.email,otp)
    return res.status(200).json({
      msg:"Otp send your Email"
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
  const {email,otp} = req.body
  const admin = await SuperAdminModel.findOne({email})
  if(!admin){
    return res.status(404).json({
      msg:"Email Not Found"
    })
  }
  if(Date.now() > admin.otpExpiry){
   console.log("otp expire")
   return res.status(400).json({
    msg:"Otp Expiry"
   })
  }

  const ismatch = await bcrypt.compare(otp.toString(),admin.otp)
  if(!ismatch){
    return res.status(400).json({
      msg:"invalid Otp"
    })
  }
  admin.otp = null
  admin.otpExpiry = null
  admin.isOtpVerified = true;

  await admin.save()
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
exports.resetpassword = async(req,res)=>{
  try{
   const {email,newPassword} = req.body
   const admin = await SuperAdminModel.findOne({email})
   if(!admin){
    return res.status(404).json({
      msg:"Admin Not Found"
    })
   }
   if(!admin.isOtpVerified){
    return res.status(400).json({
      msg:"Please Verify Otp is First"
    })
   }
   const samepassword = await bcrypt.compare(newPassword,admin.password)
   if(samepassword){
    return res.status(400).json({
      msg:"new password can not be same ad old password"
    })
   }
   const hashedpassword = await bcrypt.hash(newPassword,10)
   admin.password = hashedpassword
   admin.isOtpVerified = false
   await admin.save()
   return res.status(200).json({
    success:true,
    msg:"reset passsoword successfully",
    admin
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
  if(req.user.role !== "superAdmin"){
    return res.status(403).json({
      msg:"Only Super Admin Access"
    })
  }
  const {email} = req.user
  const profile = await SuperAdminModel.findOne({email})
  if(!profile){
    return res.status(404).json({
      msg:"Email Not Found"
    })
  }

  return res.status(200).json({
    success:true,
     profile
  })
  }catch(err){
    console.log(err)
    return res.status(500).json({
      msg:"Server Error"
    })
  }
}

exports.resendOtp = async(req,res)=>{
  try{
    const {email}= req.body
    const superadmin = await SuperAdminModel.findOne({email})
    if(!superadmin){
      return res.status(404).json({
        msg:"Email Not Found"
      })
    }
    if(superadmin.isOtpVerified){
      return res.status(400).json({
        msg:"Account is allready Verified"
      })
    }
  if(superadmin.otpExpiry){
    const lastotptime = new Date(superadmin.otpExpiry).getTime() - (30*1000)
    const timedefference = Date.now()- lastotptime
    const millisecond = 30*1000
   if(timedefference < millisecond){
    const secondleft = Math.ceil((millisecond-timedefference)/1000)
    return res.status(429).json({
      msg: `Please wait ${secondleft} seconds before requesting a new OTP.`
    })
   }
  }
  const newOtp = Math.floor(100000+Math.random()*900000).toString()
  console.log("newOtp is :", newOtp)
  const hashotp = await bcrypt.hash(newOtp,10)
  const newOtpExpiry = Date.now()+(30*1000)
  superadmin.otp = hashotp
  superadmin.otpExpiry = new Date(newOtpExpiry)
  await superadmin.save()
  return res.status(200).json({
    msg:"Resend Otp succussfull"
  })
  }catch(err){
    console.log(err)
    return res.status(500).json({
      msg:"Server Error"
    })
  }
}



