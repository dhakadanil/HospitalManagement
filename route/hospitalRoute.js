const express = require("express");
const router = express.Router();
const Joi = require("joi");
const validate = require("../middleware/validatemiddelware")
const {
    addhospital,allcityhospital,
    edithospital,
    deletehospital,
    hospitaladmin
} = require("../controllers/hospitalcontrollers");

const authmiddelware = require("../middleware/authmiddelware");
const { hospitalSchema } = require("../validations/hospitalvalidation");

router.post("/addhospital",authmiddelware,validate(hospitalSchema),addhospital)
router.get("/allcityhospital",allcityhospital)
router.put("/edithospital/:id",authmiddelware,validate(hospitalSchema),edithospital);
router.delete("/deletehospital/:id",authmiddelware,deletehospital);
router.get("/checkallhospitaladmin",authmiddelware,hospitaladmin);
module.exports = router