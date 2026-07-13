const Joi = require("joi")
const resetPasswordSchema = Joi.object({
    email: Joi.string()
    .required().trim().lowercase()
    .email({tlds:{allow:["com"]}})
    .messages({
        "string.empty":"Email is reqrired",
        "string.email":"Enter Your Valid Email"
    }),

   newPassword:Joi.string()
  .min(6).max(12)
  .required()
  .pattern(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)"))   
  .trim().min(6).max(12)
  .messages({
    "string.min":"Password kam se kam 6 characters ka chahiye",
    "string.max":"Password 12 characters se jyada nhi hona chhaiye",
    "string.empty":"Password Required hai ",
    "string.pattern.base":"password me kam se kam 1 uppercase a lowercase or 1 number"
})
})
module.exports = {resetPasswordSchema}