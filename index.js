require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

const authRoutes = require("./route/authRoute");
const hospitalRoute = require("./route/hospitalRoute")
const hospitalAdminRoute = require("./route/hospitalAdminRoute")
const doctorRoute = require("./route/doctorRoute")

const SuperAdminModel  = require("./modal/SuperAdmin");
const Hospital = require("./modal/Hospital")
const HospitalAdmin = require("./modal/HospitalAdmin");
const Doctor = require("./modal/Doctor")

app.use("/api/auth/superadmin", authRoutes);
app.use("/api/hospital",hospitalRoute);
app.use("/api/admin/hospital",hospitalAdminRoute)
app.use("/api/doctor",doctorRoute)

mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server Running On Port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database Connection Error");
    console.log(err);
  });
