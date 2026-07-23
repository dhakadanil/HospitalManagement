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
const {superAdmin} = require("../middleware/superadminMiddelware")
const authmiddelware = require("../middleware/authmiddelware");
const { hospitalSchema } = require("../validations/hospitalvalidation");
const { allcitySchema } = require("../validations/allcityhospitalvalidation");
const { hospitaleditSchema } = require("../validations/edithospitalvalidation");

router.post("/addhospital",authmiddelware,superAdmin,validate(hospitalSchema),addhospital)
router.get("/allcityhospital",validate(allcitySchema),allcityhospital)
router.put("/edithospital/:id",authmiddelware,superAdmin,validate(hospitaleditSchema),edithospital);
router.delete("/deletehospital/:id",authmiddelware,superAdmin,deletehospital);
router.get("/checkhospitaladmin",authmiddelware,superAdmin,hospitaladmin);
module.exports = router