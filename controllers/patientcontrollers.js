const Patient = require("../modal/Patient");
const bcrypt = require("bcryptjs")


exports.register = async(req,res)=>{
    try{
  const { name, email ,password } = req.body

  const Existpatient = await Patient.findOne({email});
  if(Existpatient){
    return res.status(400).json({
        msg:"Allready Register"
    })
  }
  const hashpassword = await bcrypt.hash(password,10);
  const patient = new Patient({
    name,email,
    password:hashpassword
  });
  await patient.save()
return res.status(200).json({
    msg:"Register Successfull"
})
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}

exports.login = async(req,res)=>{
    try{
  const {email , password} = req.body
  const patient = await Patient.findOne({email})
  if(!patient){
    return res.status(404).json({
        msg:"Email not Found"
    })
  };
  const matchpassword = await bcrypt.compare(password,patient.password)
  if(!matchpassword){
    return res.status(401).json({
        msg:"Wrong password"
    })
  }
 return res.status(200).json({
    message:true,
    msg:"Login Successfull"
 })
    }catch(err){
        console.log(err)
        return res.status(500).json({
            msg:"Server Error"
        })
    }
}