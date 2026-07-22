const Joi = require("joi")

const resendOtpSchema = Joi.object({
    email:Joi.string()
    .required().trim().lowercase()
    .email({tlds:{allow:["com"]}})
    .messages({
        "string.empty":"Email Is Required",
        "string.email":"Enter Your Valid Email"
    }),

});

module.exports = {resendOtpSchema}