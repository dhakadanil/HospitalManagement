const express = require("express")
const validate = require("../middleware/validatemiddelware")
const router = express.Router();


const {
    SuperAdminregister,
    SuperAdminlogin,
    profile
} = require("../controllers/authcontrollers")

const {adminRegisterSchema} = require("../validations/adminRegistervalidation")
const {adminLoginSchema} = require("../validations/adminLoginvalidation");
const authmiddelware = require("../middleware/authmiddelware");

router.post("/register",validate(adminRegisterSchema),SuperAdminregister);
router.post("/login",validate(adminLoginSchema),SuperAdminlogin)
router.get("/profile",authmiddelware,profile)
module.exports = router