export function generateVerificationOtpEmailTemplate(otpCode) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verification</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 20px auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                text-align: center;
            }
            .header {
                font-size: 24px;
                font-weight: bold;
                color: #333;
            }
            .otp-code {
                font-size: 30px;
                font-weight: bold;
                color: #007bff;
                margin: 20px 0;
            }
            .message {
                font-size: 16px;
                color: #555;
            }
            .footer {
                margin-top: 20px;
                font-size: 14px;
                color: #888;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">Email Verification</div>
            <p class="message">Your One-Time Password (OTP) for verification is:</p>
            <div class="otp-code">${otpCode}</div>
            <p class="message">Please enter this code to verify your email address. The code is valid for a limited time.</p>
            <div class="footer">If you did not request this, please ignore this email.</div>
        </div>
    </body>
    </html>
    `;
}


export function generateForgotPasswordEmailTemplate(resetPasswordUrl){
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="text-align: center; color: #333;">BoiGhor Password Reset</h2>
        <p style="color: #555;">Hello,</p>
        <p style="color: #555;">You recently requested to reset your password for your BoiGhor account. Click the button below to reset it:</p>
        <div style="text-align: center; margin: 20px 0;">
            <a href="${resetPasswordUrl}" style="background-color: #ff5722; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-size: 16px; display: inline-block;">Reset Password</a>
        </div>
        <p style="color: #555;">Or, copy and paste this link into your browser:</p>
        <p style="word-wrap: break-word; background-color: #f4f4f4; padding: 10px; border-radius: 5px;">${resetPasswordUrl}</p>
        <p style="color: #555;">If you didn't request this, you can safely ignore this email.</p>
        <hr style="border: none; border-top: 1px solid #ddd;">
        <p style="text-align: center; color: #777;">&copy; 2025 BoiGhor. All rights reserved.</p>
    </div>
    `
}