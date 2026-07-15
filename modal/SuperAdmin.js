const mongoose = require("mongoose");

const SuperadminSchema = new mongoose.Schema({
   name:{
    type:String
   },
 email:{
    type:String
 },
 password:{
    type:String
 },

 role: {
  type: String,
  unique:true,
  default: "superAdmin"
}

},{timestamps:true}
);

module.exports = mongoose.model("SuperAdmin",SuperadminSchema)

