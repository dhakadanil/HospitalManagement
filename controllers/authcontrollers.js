const SuperAdminModel  = require("../modal/SuperAdmin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
exports.SuperAdminregister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const exitsuper = await SuperAdminModel.findOne({ email });
    if (exitsuper) {
      return res.status(400).json({
        msg: "email already registered",
      });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const superadmin = new SuperAdminModel({
      name,
      email,
      password: hashedpassword,
       role: "superAdmin"
    });
    await superadmin.save();
    console.log("Data Saved");
    return res.status(201).json({
      success: true,
      msg: "Register Successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      msg: "Server Error",
    });
  }
};
exports.SuperAdminlogin = async(req,res)=>{
  try{
  const {email ,password} = req.body
  console.log(req.body);
  const superadmin = await SuperAdminModel.findOne({email});
  if(!superadmin){
    return res.status(404).json({
      msg:"Admin Email not found"
    })
  }
 const matchpassword = await bcrypt.compare(password,superadmin.password);
  if(!matchpassword){
  console.log("wrong Password");
  return res.status(400).json({
    msg:"Wrong Password"
  })
  }
const token = jwt.sign({
    id:superadmin._id,
    email:superadmin.email,
    role:superadmin.role
   },process.env.JWT_SECRET,{
    expiresIn:"1d"
   });
return res.status(200).json({
    msg:"Login Successfull",
        token: token
});

  }catch(err){
    console.log(err)
    return res.status(500).json({
      msg:"Server Error"
    })
  }
}




