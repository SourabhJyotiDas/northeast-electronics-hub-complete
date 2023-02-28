const nodeMailer = require("nodemailer");

const SMPT_SERVICE = "gmail"

const SMPT_MAIL = "sourabhtemp126@gmail.com"

const SMPT_PASSWORD = "Sourabh126@"

const SMPT_HOST = "smpt.gmail.com"

const SMPT_PORT = 465

const sendEmail = async (object)=>{
    const transporter = nodeMailer.createTransport({
        host:SMPT_HOST,
        port:SMPT_PORT,
        service:SMPT_SERVICE,
        auth:{
            user:SMPT_MAIL,
            pass:SMPT_PASSWORD
        }
    })

    const mailOptions = {
        from:SMPT_MAIL,
        to:object.email,
        subject:object.subject,
        text:object.message
    }

   await transporter.sendMail(mailOptions)
}

module.exports = sendEmail;