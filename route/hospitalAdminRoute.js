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
const {logout} = require("../controllers/logoutControllers")
const {refreshMyToken} = require("../middleware/refreshtokenMiddelware")
const {superAdmin} = require("../middleware/superadminMiddelware")
const {AdminHospital} = require("../middleware/AdminHospitalMiddelware")
const authmiddelware = require("../middleware/authmiddelware")
const {adminLoginSchema} = require("../validations/adminLoginvalidation")
const { verifyOtpSchema } = require("../validations/verifyOtpvalidation");
const {hospitaladminregisterschema} = require("../validations/hospitaladminregistervalidation")


router.post("/hospitalAdminregister",authmiddelware,superAdmin,validate(hospitaladminregisterschema),HospitalAdminRegister)
router.post("/verify-otp",authmiddelware,superAdmin,validate(verifyOtpSchema),HospitaladminVerifiOtp)
router.post("/login",authmiddelware,superAdmin,validate(adminLoginSchema),Hospitaladminlogin);
router.get("/profile",authmiddelware,AdminHospital,hospitalAdminprofile)
router.delete("/delete-hospital-admin/:id",authmiddelware,superAdmin,deleteHospitalAdmin)
router.post("/logout",authmiddelware ,logout);
router.post("/refresh-token", refreshMyToken);
module.exports = router