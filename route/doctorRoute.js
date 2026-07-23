const express = require("express");
const router = express.Router()
const validate = require("../middleware/validatemiddelware")
const {
    addDoctor,
    editdoctor,
    alldoctor,
    singledoctordetail,
    deletedoctor,
    patientselecthospitalindoctor,
    searchDoctorsBySpecialization

} = require("../controllers/doctorcontrollers");

const {doctorSchema} = require("../validations/doctorvalidation");
const { editdoctorSchema } = require("../validations/editdoctorvalidation");
const authmiddelware = require("../middleware/authmiddelware");
const {AdminHospital} = require("../middleware/AdminHospitalMiddelware")
const {rolepatient} = require("../middleware/PatientMiddelware")

router.post("/add",authmiddelware,AdminHospital,validate(doctorSchema),addDoctor)
router.get("/alldoctor",authmiddelware,AdminHospital,alldoctor)
router.get("/singledoctordetail/:id",authmiddelware,AdminHospital,singledoctordetail)
router.put("/edit/:id",authmiddelware,AdminHospital,validate(editdoctorSchema),editdoctor)
router.delete("/deletedoctor/:id",authmiddelware,AdminHospital,deletedoctor)
router.get("/hospital/:hospitalId",authmiddelware,rolepatient,patientselecthospitalindoctor)
router.get("/search/doctor/specialization",authmiddelware,rolepatient,searchDoctorsBySpecialization)
module.exports = router