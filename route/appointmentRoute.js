const express = require("express");
const router = express.Router()

const {
    appointmentBook,
    myappointments,  
    allappointment,
    appointmentupdatestatus,
    appointmentDetail
}= require("../controllers/appointmentcontrollers");

const authmiddelware = require("../middleware/authmiddelware")

router.post("/book/:doctorId",authmiddelware,appointmentBook)
router.get("/myappointments",authmiddelware,myappointments)
router.get("/allappointment/:doctorId",allappointment)
router.put("/appointmentupdatestatus/:appointmentId/status",authmiddelware,appointmentupdatestatus)
router.get("/appointmentdetail/:appointmentId",authmiddelware,appointmentDetail)
module.exports = router