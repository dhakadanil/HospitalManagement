const express = require("express");
const router = express.Router()

const {
    appointmentBook,
    myappointments
}= require("../controllers/appointmentcontrollers");

const authmiddelware = require("../middleware/authmiddelware")

router.post("/book",authmiddelware,appointmentBook)
router.get("/myappointments",authmiddelware,myappointments)
module.exports = router