const rolepatient = async(req,res,next)=>{
    try{
    if(req.user.role !== "Patient"){
        return res.status(403).json({
            msg:"Only Patient Access"
        })
    }
    next()
    }catch(err){
        console.error("Internal Middelware Error")
        return res.status(500).json({
            msg:"server Error"
        })
    }
}

module.exports = {rolepatient}