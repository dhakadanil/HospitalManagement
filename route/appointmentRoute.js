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
const {appointmentbookSchema} = require("../validations/appointmentbookvalidation");
const { updatestatusappointmentSchema } = require("../validations/appointmentUpdateStatusvalidation");

router.post("/book/:doctorId",authmiddelware,validate(appointmentbookSchema),appointmentBook)
router.get("/myappointments",authmiddelware,myappointments)
router.get("/allappointment/:doctorId",authmiddelware,allappointment)
router.put("/appointmentupdatestatus/:appointmentId/status",validate(updatestatusappointmentSchema),authmiddelware,appointmentupdatestatus)
router.get("/appointmentdetail/:appointmentId",authmiddelware,appointmentDetail)
router.get("/allappointmentstatus",authmiddelware,allappointmentstatus);
router.get("/today/appointment",authmiddelware,todayappointment)
router.get("/search/appointmentBydateandfilter",authmiddelware,searchappointmentByDate)
router.post("/cancel/:appointmentId",authmiddelware,cancelappointment)
module.exports = router