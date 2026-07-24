const jwt = require("jsonwebtoken");
const HospitalAdmin = require("../modal/HospitalAdmin");
const superAdmin = require("../modal/SuperAdmin");
const Patient = require("../modal/Patient");

const refreshMyToken = async (req, res, next) => {
    try {
        const  tokenFromFrontend  = req.cookies.refreshToken; 
        if (!tokenFromFrontend) {
            return res.status(401).json({ msg: "No refresh token provided" });
        }
        const decoded = jwt.verify(tokenFromFrontend, process.env.REFRESH_SECRET);
        let user;
        if (decoded.role === "Patient") {
            user = await Patient.findById(decoded.id);
        } else if (decoded.role === "AdminHospital") {
            user = await HospitalAdmin.findById(decoded.id);
        } else if (decoded.role === "superAdmin") {
            user = await superAdmin.findById(decoded.id);
        }

        if (!user) {
            return res.status(401).json({ msg: "User not found" });
        }
        const newAccessToken = jwt.sign(
            { id: user._id, email: user.email, role: decoded.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "15m" }
        );
        return res.status(200).json({
            success: true,
            accessToken: newAccessToken 
        });


    } catch (err) { 
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({
                msg:"Refresh Token Expired"
            })
        }
        return res.status(401).json({
            msg:"Invalid Refresh Token and Server Error",
            error:err.messgage
        })
    }
};

module.exports = { refreshMyToken };


