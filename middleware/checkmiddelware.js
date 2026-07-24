const Patient = require("../modal/Patient");
const SuperAdmin = require("../modal/SuperAdmin");
const HospitalAdmin = require("../modal/HospitalAdmin")
const refreshMyToken = async(req,res,next)=>{
    try{
  const tokenFromFrontend = req.cookies.refreshtoken
  if(!tokenFromFrontend){
    return res.status(401).json({
        msg:"no token provided"
    })
  }
  const decoded = jwt.verify(tokenFromFrontend,SECRET_KEY);
  let user ;
  if(decoded.role ==="Patient"){
    user = await Patient.findById(decoded.id)
  }else if(decoded.role === "HospitalAdmin"){
    user = await HospitalAdmin.findById(decoded.id)
  }else if(decoded.role === "superAdmin"){
    user = await SuperAdmin.findById(decpded.id)
  }else{
    return res.status(401).json({
        msg:"Invalid tokan role"
    })
  }
  if(!user){
    return res.status(404).json({
        msg:"User Not Found"
    })
  }

 const newAccessToken = jwt.sign({
     id:decoded._id,
     email:decoded.email,
     role:"decoded",
 },process.env.REFRESH_SECRET,{expiresIn:"7d"})

 return res.status(201).json({
    success:true,
    AccessToken : newAccessToken
 })
    }catch(err){
        next(err)
    }
}