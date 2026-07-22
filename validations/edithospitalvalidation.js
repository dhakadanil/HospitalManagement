const Joi = require("joi")

const hospitaleditSchema = Joi.object({
    name:Joi.string(),
    address:Joi.string(),
    phone:Joi.string()
    .pattern(/^[0-9]{10}$/)
    .messages({
        "string.pattern.base":"Only 10 Digit Number is valid"
    }),
    city:Joi.string()
    .trim(),
    state:Joi.string()
    .trim(),
    Pincode:Joi.string()
    .trim()
})

module.exports = {hospitaleditSchema}