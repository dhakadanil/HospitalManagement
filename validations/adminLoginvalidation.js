const Joi = require("joi");

const adminLoginSchema = Joi.object({
    name:Joi.string()
    ,
    email:Joi.string()
    .lowercase().trim()
    .required()
    .email({tlds:{allow:["com"]}})
    .messages({
        "string.email":"please enter your valid email",
        "string.empty":"email required"
    }),
    password:Joi.string()
    .min(6).max(12)
    .trim().required()
    .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"))
    .messages({
        "string.empty":"Password required",
        "string.min":"kam se kam 6 password required",
        "string.max":"password 12 se jyda not allowed"
    })
})
module.exports = {adminLoginSchema}