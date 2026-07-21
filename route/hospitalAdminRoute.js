const express = require("express");
const router = express.Router()
const validate = require("../middleware/validatemiddelware")
const {
HospitalAdminRegister,
HospitaladminVerifiOtp,
Hospitaladminlogin,
hospitalAdminprofile,
deleteHospitalAdmin
} = require("../controllers/admincontrollers");

const authmiddelware = require("../middleware/authmiddelware")
const {adminLoginSchema} = require("../validations/adminLoginvalidation")
const { verifyOtpSchema } = require("../validations/verifyOtpvalidation");
const {hospitaladminregisterschema} = require("../validations/hospitaladminregistervalidation")


router.post("/hospitalAdminregister",validate(hospitaladminregisterschema),authmiddelware,HospitalAdminRegister)
router.post("/verify-otp",validate(verifyOtpSchema),HospitaladminVerifiOtp)
router.post("/login",validate(adminLoginSchema),Hospitaladminlogin);
router.get("/profile",authmiddelware,hospitalAdminprofile)
router.delete("/delete-hospital-admin/:id",authmiddelware,deleteHospitalAdmin)
module.exports = router