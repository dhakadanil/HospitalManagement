const Joi = require("joi")

const forgotPasswordSchema  = Joi.object({
   email:Joi.string()
   .trim().required().lowercase()
   .email({tlds:{allow:["com"]}})
   .messages({
    "string.email":"Enter your Valid Email",
    "string.empty":"Email Required"
   })


})
module.exports ={forgotPasswordSchema}