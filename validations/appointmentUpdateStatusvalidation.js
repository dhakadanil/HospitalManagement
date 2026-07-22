const Joi = require("joi")

const updatestatusappointmentSchema = Joi.object({
    status:Joi.string()
    .valid("Pending","Approved","Completed","Cancel")
    .messages({
        "any.only":"Status Is Not Allowed",
        "string.empty":"status Can'not be Empty"
    })
})

module.exports = {updatestatusappointmentSchema}