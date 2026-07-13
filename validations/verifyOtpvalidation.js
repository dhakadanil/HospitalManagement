const Joi = require("joi");

const verifyOtpSchema = Joi.object({
    email:Joi.string()
    .lowercase()
    .trim().required()
    .email({tlds:{allow:["com"]}})
    .messages({
        "string.email":"Enter your valid email",
        "string.empty":"email required"
    }),

    otp:Joi.string()
    .trim()
    .required()
    .pattern(/^[0-9]{6}$/)
    .messages({
        "string.empty":"Otp Is Required",
        "string.pattern.base":"please enter Otp 6 disit number"
    })
})
module.exports = {verifyOtpSchema}