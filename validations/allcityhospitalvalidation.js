const Joi = require("joi")

const allcitySchema = Joi.object({
    city:Joi.string()
    .trim().messages({
         "string.empty": "City is required",
    })
})
module.exports = {allcitySchema}