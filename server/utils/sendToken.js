export const sendToken = (user, statusCode, message, res) => {
    const token = user.generateToken();

    res.status(statusCode)
       .cookie("token", token, {
           expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
           httpOnly: true,
           sameSite: "None",   // Crucial for cross-origin frontend
           secure: true        // Required if using HTTPS (e.g., Vercel/Netlify)
       })
       .json({
           success: true,
           user,
           message,
           token
       });
};

