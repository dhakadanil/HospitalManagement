const jwt = require("jsonwebtoken");
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
     req.user = tokendata;
     next()
}catch(err){
    console.log("invalid tokan")
    return res.status(401).json({
        msg:"Invalid Tokan"
    })
}
}

module.exports = authmiddelware;