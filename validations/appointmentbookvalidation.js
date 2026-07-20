const Joi = require("joi");

const appointmentbookSchema = Joi.object({
    appointmentDate: Joi.string()
    .required().messages({
        "date.base":"appointment Date must be Valid",
        "any.required":"appointmentDate is required"
    }),
    appointmentTime:Joi.string()
    .required().pattern(/^[01]\d|2[0-3]:([0-5]\d)$/)
    .messages({
        "any.required":"AppoimentTime is required",
        "string.pattern.base":"Time must be in HH MM formet (example: 14:30)",
        "any.required":"AppointmentTime is required"
    }),
    reason:Joi.string()
    .required().trim()
    .min(3).max(100).messages({
        "string.required":"Reason Is Required",
        "string.min":"Reason most be at least 3 Characters",
        "string.max":"Reason Can'not excced 100 Characters"
    })

});

module.exports = {appointmentbookSchema}