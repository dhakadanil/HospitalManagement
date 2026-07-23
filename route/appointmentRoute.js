const express = require("express");
const router = express.Router()
const validate = require("../middleware/validatemiddelware")
const {
    appointmentBook,
    myappointments,  
    allappointment,
    appointmentupdatestatus,
    appointmentDetail,
    allappointmentstatus,
    todayappointment,
    searchappointmentByDate,
    cancelappointment
}= require("../controllers/appointmentcontrollers");

const authmiddelware = require("../middleware/authmiddelware")
const {AdminHospital} = require("../middleware/AdminHospitalMiddelware")
const {rolepatient} = require("../middleware/PatientMiddelware")
const {appointmentbookSchema} = require("../validations/appointmentbookvalidation");
const { updatestatusappointmentSchema } = require("../validations/appointmentUpdateStatusvalidation");

router.post("/book/:doctorId",authmiddelware,rolepatient,validate(appointmentbookSchema),appointmentBook)
router.get("/myappointments",authmiddelware,rolepatient,myappointments)
router.get("/allappointment/:doctorId",authmiddelware,AdminHospital,allappointment)
router.put("/appointmentupdatestatus/:appointmentId/status",authmiddelware,AdminHospital,validate(updatestatusappointmentSchema),appointmentupdatestatus)
router.get("/appointmentdetail/:appointmentId",authmiddelware,AdminHospital,appointmentDetail)
router.get("/allappointmentstatus",authmiddelware,AdminHospital,allappointmentstatus);
router.get("/today/appointment",authmiddelware,AdminHospital,todayappointment)
router.get("/search/appointmentBydateandfilter",authmiddelware,AdminHospital,searchappointmentByDate)
router.post("/cancel/:appointmentId",authmiddelware,rolepatient,cancelappointment)
module.exports = router