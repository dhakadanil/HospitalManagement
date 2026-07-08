const express = require("express");
const router = express.Router()
const validate = require("../middleware/validatemiddelware")
const {
    addDoctor,
    editdoctor
} = require("../controllers/doctorcontrollers");

const {doctorSchema} = require("../validations/doctorvalidation");
const authmiddelware = require("../middleware/authmiddelware");

router.post("/add",validate(doctorSchema),authmiddelware,addDoctor)
router.get("/")
router.put("/edit/:id",validate(doctorSchema),authmiddelware,editdoctor)
module.exports = router