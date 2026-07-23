const jwt = require("jsonwebtoken");
const HospitalAdmin = require("../modal/HospitalAdmin");
const superAdmin = require("../modal/SuperAdmin");
const Patient = require("../modal/Patient");

const refreshMyTokenMiddleware = async (req, res, next) => {
    try {
        // 1. Frontend se Refresh Token manga
        const { tokenFromFrontend } = req.body; 

        if (!tokenFromFrontend) {
            return res.status(401).json({ msg: "No refresh token provided" });
        }

        // 2. Token ko REFRESH_SECRET se verify kiya
        const decoded = jwt.verify(tokenFromFrontend, process.env.REFRESH_SECRET);

        // 3. Role ke hisab se sahi database se user nikaala
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

        // 4. Naya Access Token generate kiya
        const newAccessToken = jwt.sign(
            { id: user._id, email: user.email, role: user.role }, 
            process.env.JWT_SECRET, 
            { expiresIn: "15m" }
        );

        // 5. Naye token ko response me bhej diya
        return res.status(200).json({
            success: true,
            accessToken: newAccessToken 
        });

        // Note: Yahan next() nahi chalayenge kyunki token response yahin se khatam ho gaya hai.

    } catch (err) {
        // 6. Agar token expire ho gaya ya database fail hua, toh error Global Handler ke paas bhej do
        next(err); 
    }
};

module.exports = { refreshMyTokenMiddleware };
