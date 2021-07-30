// Create and send token and save in the cookie.
const sendToken = (user, statusCode, res, req) => {
  // Create Jwt token
  const token = user.getJwtToken();

  // Options for cookie
  const options = {
    expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000),
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    httpOnly: true,
  };
  // if (process.env.NODE_ENV === 'PRODUCTION') {
  //   options.secure = true;
  // }
  //remove password from output
  user.password = undefined;

  res.cookie('token', token, options);
  res.status(statusCode).json({
    success: true,
    token,
    user,
  });
};

module.exports = sendToken;
