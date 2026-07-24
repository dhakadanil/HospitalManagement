exports.logout = async(req,res)=>{
    try{
        const token = req.cookies.refreshToken
        if(!token){
            return res.status(401).json({
                msg:"Allready LogOut"
            })
        }
  res.clearCookie("refreshToken",{
    httpOnly:true,
    secure:false,
    sameSite:"strict"
  });
  res.status(200).json({
    msg:"LogOut SuccessFully! Cookie Clear ",
  })

    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:'Server Error'
        })
    }
}