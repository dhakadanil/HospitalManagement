const express = require("express")
const validate = require("../middleware/validatemiddelware")
const router = express.Router();


const {
    SuperAdminregister,
    SuperAdminlogin,
    forgotpassword,
    VerifyOtp,
    resetpassword,
    profile,
    resendOtp
} = require("../controllers/authcontrollers")
const {refreshMyTokenMiddleware } = require("../middleware/refreshtokenMiddelware")
const {superAdmin} = require("../middleware/superadminMiddelware")
const {adminRegisterSchema} = require("../validations/adminRegistervalidation")
const {adminLoginSchema} = require("../validations/adminLoginvalidation");
const {forgotPasswordSchema} =require("../validations/forgotPasswordvalidation")
const { verifyOtpSchema } = require("../validations/verifyOtpvalidation");
const { resetPasswordSchema } = require("../validations/resetpasswordvalidation");
const { resendOtpSchema } = require("../validations/resendOtpvalidation");
const authmiddelware = require("../middleware/authmiddelware"); 


router.post("/register",validate(adminRegisterSchema),SuperAdminregister);
router.post("/verify-otp",validate(verifyOtpSchema),VerifyOtp)
router.post("/login",validate(adminLoginSchema),SuperAdminlogin)
router.post("/forgotpassword",validate(forgotPasswordSchema),forgotpassword)
router.post("/reset-password",validate(resetPasswordSchema),resetpassword)
router.get("/profile",authmiddelware,superAdmin,profile)
router.post("/resend-Otp",validate(resendOtpSchema),resendOtp)

router.post("/refresh-token", refreshMyTokenMiddleware);
module.exports = router