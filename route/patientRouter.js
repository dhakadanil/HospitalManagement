const express = require("express")
const router = express.Router()
const validate = require("../middleware/validatemiddelware")

const {
register,
login,
profile,
editprofile,
forgotpassword,
VerifyOtp,
resetpassword
} = require("../controllers/patientcontrollers")
const authmiddelware = require("../middleware/authmiddelware")

const {patientSchema} = require("../validations/patientvalidation")
const {forgotPasswordSchema} = require("../validations/forgotPasswordvalidation")
const { verifyOtpSchema } = require("../validations/verifyOtpvalidation")
const {resetPasswordSchema} = require("../validations/resetpasswordvalidation")
const { patienteditSchema } = require("../validations/patienteditvalidation")

router.post("/register",validate(patientSchema),register);
router.post("/login",validate(patientSchema),login)
router.get("/profile",authmiddelware,profile);
router.put("/updateprofile",validate(patienteditSchema),authmiddelware,editprofile)
router.post("/forgotpassword",validate(forgotPasswordSchema),forgotpassword)
router.post("/verify-otp",validate(verifyOtpSchema),VerifyOtp)
router.post("/resetpassword",validate(resetPasswordSchema),resetpassword)
module.exports = router