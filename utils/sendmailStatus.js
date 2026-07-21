const nodemailer = require("nodemailer");
const Appointment = require("../modal/Appointment");

const transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
    }

})
    const sendappointmentMail = async(
        email,status,appointmentDate,appointmentTime
    )=>{
        try{
        let subject;
        let text;
        if(status == "Approved"){
            subject = "Appointment Approved",
            text = `Hello ,
             Your Hospital Appointment has been Approved
            Appointment Date : ${appointmentDate}
            Appointment Time : ${appointmentTime}
            status : Approved
            
            thank you`;
        }else if(status === "Cencal"){
            subject = "Appointment Cancel"
            text = `Hello , Your Hospital Appointment has been Cancel
            Appointment Date : ${appointmentDate}
            Appointment Time : ${appointmentTime}
            status = Cencel 
            
            Please Contect the Hospital for more information `;
        }else if(status === "Completed"){
            subject = "Appointment Completed"
            text = `Your Appointment has been Completed
            Appointment Date : ${appointmentDate}
            Appointment Time : ${appointmentTime}
            status = Completed 
            
            Thank you `
        }else{
            subject = `Appointment Status: ${status}`;
            text = `Your Appointment status is now ${status}.`;
        }
        const mailOption = {
            from:process.env.EMAIL_USER,
            to:email,
            subject:subject,
            text:text
        }
        await transporter.sendMail(mailOption);
        console.log("Appointment Email Send Successfully")
    }catch(err){
        console.log(err)
        throw err
    }}


    module.exports = sendappointmentMail;