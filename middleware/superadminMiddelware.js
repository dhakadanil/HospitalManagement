const superAdmin = async(req,res,next)=>{
    try{
    if(req.user.role !== "superAdmin"){
        return res.status(403).json({
            msg:"Only Super Admin Access"
        })
    }
    next()
    }catch(err){
    console.error("Superadmin Middelware Error",err)
    return res.status().json({
     msg:"Internal Server Error"
    }) 
}
}
module.exports = {superAdmin}