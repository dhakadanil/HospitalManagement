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
})
module.exports = {verifyOtpSchema}