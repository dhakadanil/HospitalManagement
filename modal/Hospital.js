const mongoose = require("mongoose");

const hospitalschema = new mongoose.Schema({
    name:{
        type:String
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    pincode:{
       type:String
    }
},
{ timestamps: true}
)
module.exports = mongoose.model("Hospital",hospitalschema)