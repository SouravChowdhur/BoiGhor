import { generateVerificationOtpEmailTemplate } from "./emailTemplates.js";
import { sendEmail } from "./sendEmai.js";

export async function sendVerificationCode(verificationCode, email, res) {
    try{
         const message = generateVerificationOtpEmailTemplate(verificationCode);
         sendEmail({
            email,
            subject: "verification code(YourPersonalBoiGhor.com)",
            message,
         });
         res.status(200).json({
            success: true,
            message: "verification code sent successfully",
         })
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message: "verification code failed to send."
        })
    }
}