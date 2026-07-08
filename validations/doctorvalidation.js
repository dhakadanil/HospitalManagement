const Joi = require("joi");

const doctorSchema = Joi.object({
    name:Joi.string()
    .required().min(3)
    .messages({
        "string.empty":"Name Required",
        "string.min":"Name is minimum 3 charactera"
    }),
    email:Joi.string()
    .email({tlds:{allow:["com"]}})
    .required().trim()
    .lowercase().messages({
        "string.empty":"Eamil Required",
        "string.email":"Please Enter Your valid email"
    }),
    phone:Joi.string()
    .required().trim()
    .pattern(/^[0-9]{10}$/)
    .messages({
        "string.empty":"Phone Number Is Required",
        "string.pattern.base":"Phone Number 10 hi valid hai"
    }),
    gender:Joi.string()
    .required().trim().valid("Male","Female")
    .messages({
        "string.empty":"Gender is required",
        "any.only":"Gender : Male And Female Allow"
    }),
    age:Joi.string()
    .required().trim()
    .messages({
        "string.empty":"Age Required"
    }),
    specialization:Joi.string()
    .trim().required()
    .messages({
        "string.empty":"Specialization required"
    }),
    experience:Joi.string()
    .required().messages({
        "String.empty":"Experience Required"
    }),
   

})

module.exports = {doctorSchema}