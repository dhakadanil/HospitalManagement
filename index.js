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
const patientRoute = require("./route/patientRouter")
const appointmentRoute = require("./route/appointmentRoute")

const SuperAdminModel  = require("./modal/SuperAdmin");
const Hospital = require("./modal/Hospital")
const HospitalAdmin = require("./modal/HospitalAdmin");
const Doctor = require("./modal/Doctor")
const Patient = require("./modal/Patient")
const Appointment = require("./modal/Appointment")

app.use("/api/auth/superadmin", authRoutes);
app.use("/api/hospital",hospitalRoute);
app.use("/api/admin/hospital",hospitalAdminRoute)
app.use("/api/doctor",doctorRoute);
app.use("/api/patient",patientRoute)
app.use("/api/appointment",appointmentRoute)

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
