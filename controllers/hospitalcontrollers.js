const Hospital = require("../modal/Hospital");
const HospitalAdmin = require("../modal/HospitalAdmin")

exports.addhospital = async(req,res)=>{
    try{
    console.log(req.user)
    if(req.user.role !== "superAdmin"){
        return res.status(401).json({
            msg:"Only super admin access"
        })
    }
    const {name ,address,phone,city,state,pincode } = req.body
    console.log(req.body);
    const Existshospital = await Hospital.findOne({name,address,city});
    if(Existshospital){
        return res.status(400).json({
            msg:"Hospital Allready add"
        })
    }
    const hospital = new Hospital({
        name , address ,phone,
        city ,state ,pincode
    })
  await hospital.save()
   return res.status(201).json({
        success:true,
        msg:"Add hospital",
        hospital
    })
}catch(err){
    console.log(err)
    return res.status(500).json({
        msg:"Server Error"
    })
}
}
exports.allcityhospital = async(req,res)=>{
try{
    const {city} = req.query
    let hospitals;
    if(city){
    hospitals=  await Hospital.find({city:{$regex:`^${city}$`,$options:"i"}})
    }else{
      hospitals=  await Hospital.find()
    }

    return res.status(200).json({
        success:true,
        totalHospital:hospitals.length,
        hospitals
    })
}catch(err){
    console.log(err)
    return res.status(500).json({
        msg:"Server Error"
    })
}
}

exports.edithospital = async(req,res)=>{
    try{
         if(req.user.role !== "superAdmin"){
        return res.status(401).json({
            msg:"Only super admin access"
        })
    }
    const {id} = req.params
    const {name ,address , phone,city,state,pincode} = req.body
    const existhospital = await Hospital.findOne({name,city ,_id:{$ne:id}})
    if(existhospital){
        return res.status(400).json({
            msg:"Hospital Allready Exists"
        })
    }
    const updatedata = {};
    if(name)updatedata.name = name;
    if(address)updatedata.address = address;
    if(phone)updatedata.phone = phone;
    if(city)updatedata.city = city;
    if(state)updatedata.state = state;
    if(pincode)updatedata.pincode = pincode
    if(Object.keys(updatedata).length ==0){
        return res.status(400).json({
            msg:"Please Provide at One field add"
        })
    }
    const hospital = await Hospital.findByIdAndUpdate(id,updatedata,{new:true});
    if(!hospital){
        return res.status(404).json({
            msg:"Hospital Not Found"
        })
    }
    return res.status(200).json({
        seccess:true,
        msg:"Hospital Update Successfull",
        hospital
    })
}catch(err){
    console.log(err)
    return res.status(500).json({
        msg:"Server Error"
    })
}
}

exports.deletehospital = async(req,res)=>{
    try{
         if(req.user.role !== "superAdmin"){
        return res.status(403).json({
            msg:"Only super admin access"
        })
    }
     const {id} = req.params
     const hospital = await Hospital.findByIdAndDelete(id)
     console.log(hospital)
     if(!hospital){
        return res.status(404).json({
            msg:"Hospital not found"
        })
     }
     return res.status(200).json(
        {
        success:true,
        msg:"Hospital delete Successfully"
     })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

exports.hospitaladmin = async(req,res)=>{
try {     
    if (req.user.role !== "superAdmin") {
        return res.status(403).json({
        msg: "Only Super Admin Access"
        });
        }
    const { hospitalId } = req.query;
    if (hospitalId) {
      const admin = await HospitalAdmin.findOne({ hospitalId }).populate("hospitalId");
      if(!admin){
        return res.status(404).json({
            msg:"hospital admin not found"
        })
      }
          return res.status(200).json({
           success:true,admin
    })
    }
    const admins = await HospitalAdmin.find().populate("hospitalId");
    if(admins.length === 0){
        return res.status(404).json({
            msg:"No Hospital Admin Found"
        })
    }
        return res.status(200).json({
            success: true,
            totalAdmins: admins.length,
            admins
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Server Error"
        });
    }
};

