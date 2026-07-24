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
const {refreshMyToken } = require("../middleware/refreshtokenMiddelware")
const {logout} = require("../controllers/logoutControllers")
const authmiddelware = require("../middleware/authmiddelware")
const {rolepatient} = require("../middleware/PatientMiddelware")
const {patientSchema} = require("../validations/patientvalidation")
const {forgotPasswordSchema} = require("../validations/forgotPasswordvalidation")
const { verifyOtpSchema } = require("../validations/verifyOtpvalidation")
const {resetPasswordSchema} = require("../validations/resetpasswordvalidation")
const { patienteditSchema } = require("../validations/patienteditvalidation")

router.post("/register",validate(patientSchema),register);
router.post("/login",validate(patientSchema),login)
router.get("/profile",authmiddelware,rolepatient,profile);
router.put("/updateprofile",authmiddelware,rolepatient,validate(patienteditSchema),editprofile)
router.post("/forgotpassword",validate(forgotPasswordSchema),forgotpassword)
router.post("/verify-otp",validate(verifyOtpSchema),VerifyOtp)
router.post("/resetpassword",validate(resetPasswordSchema),resetpassword)
router.post("/logout",authmiddelware ,logout);
router.post("/refresh-token", refreshMyToken);
module.exports = router