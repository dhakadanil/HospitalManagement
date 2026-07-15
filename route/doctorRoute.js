const express = require("express");
const router = express.Router()
const validate = require("../middleware/validatemiddelware")
const {
    addDoctor,
    editdoctor,
    alldoctor,
    singledoctordetail,
    deletedoctor,


} = require("../controllers/doctorcontrollers");

const {doctorSchema} = require("../validations/doctorvalidation");
const authmiddelware = require("../middleware/authmiddelware");

router.post("/add",validate(doctorSchema),authmiddelware,addDoctor)
router.get("/alldoctor",authmiddelware,alldoctor)
router.get("/singledoctordetail/:id",authmiddelware,singledoctordetail)
router.put("/edit/:id",validate(doctorSchema),authmiddelware,editdoctor)
router.delete("/deletedoctor/:id",authmiddelware,deletedoctor)

module.exports = router