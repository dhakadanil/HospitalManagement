const Joi = require("joi");

const adminRegisterSchema = Joi.object({
    name:Joi.string()
    .min(3),

  email:Joi.string()
  .email({tlds:{allow:["com"]}})
  .lowercase().trim()
  .required()
  .messages({
    "string.email":"please enter your valid email",
    "string.empty":"Email required hai"
  }),
  password:Joi.string()
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

module.exports = {adminRegisterSchema}