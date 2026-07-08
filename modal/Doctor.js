const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
 
    phone:{
        type:String
    },
    gender:{
        type:String,
        enum:["Male","Female"]
    },
    age:{
        type:String
    },
    specialization:{
        type:String
    },
    experience:{
        type:String
    },
    hospitalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Hospital"
    },
    role:{
        type:String,
        default:"Adminhospital"
    }
},
{timestamps:true}
) 
module.exports = mongoose.model("Doctor",doctorSchema)