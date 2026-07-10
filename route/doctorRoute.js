const express = require("express");
const router = express.Router()
const validate = require("../middleware/validatemiddelware")
const {
    addDoctor,
    editdoctor,
    alldoctor,
    singledoctordetail,
    deletedoctor,
    allappointment,
    appointmentupdatestatus
} = require("../controllers/doctorcontrollers");

const {doctorSchema} = require("../validations/doctorvalidation");
const authmiddelware = require("../middleware/authmiddelware");

router.post("/add",validate(doctorSchema),authmiddelware,addDoctor)
router.get("/alldoctor",authmiddelware,alldoctor)
router.get("/singledoctordetail/:id",authmiddelware,singledoctordetail)
router.put("/edit/:id",validate(doctorSchema),authmiddelware,editdoctor)
router.delete("/deletedoctor/:id",authmiddelware,deletedoctor)
router.get("/allappointment/:doctorId",allappointment)
router.put("/appointmentupdatestatus/:appointmentId/status",appointmentupdatestatus)
module.exports = router