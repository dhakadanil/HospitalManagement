const express = require("express")
const validate = require("../middleware/validatemiddelware")
const router = express.Router();


const {
    SuperAdminregister,
    SuperAdminlogin,
} = require("../controllers/authcontrollers")

const {adminRegisterSchema} = require("../validations/adminRegistervalidation")
const {adminLoginSchema} = require("../validations/adminLoginvalidation")

router.post("/register",validate(adminRegisterSchema),SuperAdminregister);
router.post("/login",validate(adminLoginSchema),SuperAdminlogin)
module.exports = router