const { promisify } = require('util');

const jwt = require('jsonwebtoken');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncErrors = require('./catchAsyncErrors');
const User = require('../models/user');
// Checks if user is authenticated or not
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler('Login first to access this resource.', 401));
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  //Check if user still exist
  if (!user) {
    return next(new ErrorHandler(`User belonging to this token no longer exist`, 401));
  }

  //Check if user change password after token was issued
  if (user.changePasswordAfter(decoded.iat)) {
    return next(new ErrorHandler(`User recently changed password please login again !!`, 401));
  }
  //GRANT ACCESS TO PROTECTED ROUTES
  req.user = user;
  next();
});

// Handling users roles
exports.authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to acccess this resource`, 403));
    }
    next();
  };
