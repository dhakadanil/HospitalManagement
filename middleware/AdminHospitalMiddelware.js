const AdminHospital = async(req,res,next)=>{
    try{
   if(req.user.role !== "AdminHospital"){
    return res.status(403).json({
        msg:"Only Hospital Admin Access"
    })
   }
   next()
    }catch(err){
        console.error("AdminHospital Middelware Error");
        return res.status(500).json({
            msg:"Internal Server Error"
        })
    }
}
module.exports = {AdminHospital}