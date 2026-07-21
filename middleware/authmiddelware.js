const jwt = require("jsonwebtoken");
const HospitalAdmin = require("../modal/HospitalAdmin");
const superAdmin = require("../modal/SuperAdmin")
const Patient = require("../modal/Patient")
const JWT_SECRET = process.env.JWT_SECRET
const authmiddelware = async(req,res,next)=>{
    try{
    const authHeader  = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            msg:"no tokan provided"
        })
    };
    const token = authHeader.split(" ")[1];
    const tokendata = jwt.verify(token,JWT_SECRET);
    let user;
    if(tokendata.role === "Patient"){
        user = await Patient.findById(tokendata.id)
    }else if(tokendata.role === "AdminHospital"){AdminHospital
        user = await HospitalAdmin.findById(tokendata.id)
    }else if(tokendata.role === "superAdmin"){
        user = await superAdmin.findById(tokendata.id)
    }else{
        return res.status(401).json({
            msg:"invalid user role"
        })
    }
    if(!user){
        return res.status(401).json({
            msg:"User Account No longer"
        })
    }
     req.user = tokendata;
     console.log(req.user);
     next()
}catch(err){
    console.log("invalid tokan")
    return res.status(401).json({
        msg:"Invalid Tokan"
    })
}
}
module.exports = authmiddelware;