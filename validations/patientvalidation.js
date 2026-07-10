const Joi = require("joi");

const patientSchema = Joi.object({

email:Joi.string()
.email({tlds:{allow:["com"]}})
.required().trim().lowercase()
.messages({
    "string.empty":"Email Is Required",
    "string.email":"Please Enter a Valid Email"
}),
password:Joi.string()
.required().trim()
.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)
.min(6).max(12).messages({
    "string.empty":"Password Is Required",
    "string.min":"Password minimum 6 characters",
    "string.max":"password maximum 12 characters",
    "string.pattern.base":"password 1 lowercase, 1 uppercase,1 number"
}),
phone:Joi.string()
.required().trim()
.pattern(/^[0-9]{10}$/)
.message({
    "string.empty":"phone number is required",
    "string.pattern":"please enter a valid number"
}),
dateOfBirth:Joi.date()
.required().messages({
    "string.empty":"DateOfBirth Is required",
}),
gender:Joi.string()
.valid("Male","Female").required()
.messages({
  "string.empty":"Gender is required",
  "any.only":"Gender must bs Male And Female"
})
})

module.exports = {patientSchema}