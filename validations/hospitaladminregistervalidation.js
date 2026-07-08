const Joi = require("joi");

const hospitaladminregisterschema = Joi.object({
    name:Joi.string()
    .min(3)
    .required()
    .messages({
        "string.empty":"Name is Required",
        "string.min":"Name must be 3 characters"
    }),
    email:Joi.string()
    .trim().required()
    .email({tlds:{allow:["com"]}})
    .lowercase().messages({
        "string.empty":"Email Required",
        "srting.email":"Please Enter a Valid email"
    }),
    password:Joi.string()
    .trim().min(6).max(12)
    .required().pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"))
    .messages({
        "string.empty":"Password Required",
        "string.min":"minimum password 6 characters",
        "string.max":"maximum password 12 characters",
        "string.pattern.base":"password 1 uppercase And 1 lowercase and 1 number "
    }),
    phone:Joi.string()
    .required()
    .pattern(/^[0-9]{10}$/).message({
        "string.empty":"Phone number required",
        "string.pattern.base":"please enter a valid number",
        
    }),
    hospitalId:Joi.string()
    .trim().required().hex()
    .messages({
        "string.empty":"Hospital Id required",
        "string.hex":"hospital id must be valid mongodb objectid"
    })
})

module.exports = {hospitaladminregisterschema}