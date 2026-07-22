const Joi = require("joi")

const patienteditSchema = Joi.object({
name:Joi.string(),
email:Joi.string()
.trim().lowercase()
.email({tlds:{allow:["com"]}})
.messages({
    "string.email":"Please enter a valid Email"
}),
phone:Joi.string()
.trim().pattern(/^[0-9]{10}$/)
.messages({
    "string.pattern":"Please Enter a Valid Number"
}),
gender:Joi.string()
.valid("Male","Female")
.messages({
    "any.only":"Gender must be Male And Female"
})
})
module.exports = {patienteditSchema}