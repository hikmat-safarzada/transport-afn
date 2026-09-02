const nodemailer = require("nodemailer")
const { config } = require("../config/config")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.email_user,
        pass: config.email_pass
    }
})

const sendResetPasswordEmail = async (to, resetLink) => {
    await transporter.sendMail({
        from: `"AFN Transport" <${config.email_user}>`,
        to,
        subject: "Şifrənizi bərpa edin",
        html: `
            <p>Salam,</p>
            <p>Şifrənizi bərpa etmək üçün aşağıdakı linkə klikləyin:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>Bu link 15 dəqiqə ərzində etibarlıdır.</p>
            <p>Əgər siz bu sorğunu göndərməmisinizsə, bu email-i nəzərə almayın.</p>
        `
    });

}

module.exports = {sendResetPasswordEmail}