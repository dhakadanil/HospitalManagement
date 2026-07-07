const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});
const sendMail = async (email, otp) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "OTP Verification",
            text: `Your OTP is ${otp}`
        };
        await transporter.sendMail(mailOptions);
        console.log("Email Sent Successfully");
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = sendMail;