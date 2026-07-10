const express = require("express")
const router = express.Router()
const validate = require("../middleware/validatemiddelware")

const {
register,
login,
profile
} = require("../controllers/patientcontrollers")
const authmiddelware = require("../middleware/authmiddelware")
const {patientSchema} = require("../validations/patientvalidation")

router.post("/register",validate(patientSchema),register);
router.post("/login",validate(patientSchema),login)
router.get("/profile",authmiddelware,profile)
module.exports = router