export const sendToken = (user, statusCode, message, res) => {
  const token = user.generateToken();

  res.status(statusCode)
    .cookie("token", token, {
      expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true, // important for HTTPS
      sameSite: "None" // important for cross-origin cookies (Netlify → Render)
    })
    .json({
      success: true,
      user,
      message,
      token
    });
};


export const logout = (req, res) => {
  res.status(200)
    .cookie("token", "", {
      expires: new Date(0),
      httpOnly: true,
      secure: true, // important for production
      sameSite: "None" // required if using cross-origin cookies
    })
    .json({
      success: true,
      message: "Logged out successfully"
    });
};
