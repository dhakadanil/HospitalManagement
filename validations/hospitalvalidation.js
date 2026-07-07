const Joi = require("joi");

const hospitalSchema = Joi.object({
    name:Joi.string()
    .required().messages({
        "string.empty":"Name required"
    }),
    address:Joi.string()
    .required().messages({
        "string.empty":"Address required"
    }),
    phone:Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
        "string.empty":"Phone Number Required",
        "string.pattern.base":'Phone Number 10 hi Valid hai'
    }),
    city:Joi.string()
    .required().trim()
     .messages({
        "string.empty":"City Required"
     }),
     state:Joi.string()
     .required().trim()
     .messages({
        "string.empty":"State Required"
     }),
     pincode:Joi.string()
     .required().trim()
     .messages({
        "string.empty":"PinCode Required"
     })
});

module.exports = {hospitalSchema}