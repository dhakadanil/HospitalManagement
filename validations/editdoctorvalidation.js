const Joi = require("joi")

const editdoctorSchema = Joi.object({
name:Joi.string()
.min(3).messages({
    "string.min":"Name is Minimum 3 Character"
}),
email:Joi.string()
.email({tlds:{allow:["com"]}})
.messages({
    "string.email":"Please Enter a Valid Email"
}),
phone:Joi.string()
.pattern(/^[0-9]{10}$/)
.messages({
    "string.pattern.base":"Only 10 Digit Number Is Valid "
}),
gender:Joi.string()
.valid("Male","Female").trim()
.messages({
    "string.any":"Gender :Male And Female Allow"
}),
age:Joi.string()
.min(2).trim()
.messages({
    "string.min":"Doctor Age 2 Number Is Valid"
}),
specialization:Joi.string()
.trim(),
experience:Joi.string()

})

module.exports = {editdoctorSchema}