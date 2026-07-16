const Joi = require("joi")

const allcitySchema = Joi.object({
    city:Joi.string()
    .trim()
})
module.exports = {allcitySchema}