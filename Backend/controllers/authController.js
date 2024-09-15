import catchAsync from "../utils/catchAsync.js";
import User from "../Models/UserSchema.js";
import Doctor from "../Models/DoctorSchema.js";
import AppError from "../errorHandlers/appError.js";
import {
  SignInAccessToken,
  SignInRefreshToken,
  sendToken,
} from "../utils/sendToken.js";
import Email from "../emails/email.js";
import jwt from "jsonwebtoken";
import { correctPassword } from "../services/passwordServices.js";
import Notification from "../Models/notificationSchema.js";

// Create activation token and the token
export const createActivationToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();

  const activationToken = jwt.sign(
    { user, activationCode },
    process.env.VERIFY_EMAIL_SECRET,
    {
      expiresIn: process.env.VERIFY_EMAIL_EXPIRES_IN,
    }
  );

  return { activationToken, activationCode };
};

// Verify Account before saving it.
export const signUp = catchAsync(async (req, res, next) => {
  const { email, name, password, confirmPassword, role, gender, photo } =
    req.body;



  const allowedRole = ["patient", "doctor"];
  if (!allowedRole.includes(req.body.role)) {
    return next(
      new AppError(`The specified role "${req.body.role}" is invalid`)
    );
  }

  const patient = await User.findOne({ email });
  const doctor = await Doctor.findOne({ email });

  if (patient || doctor) return next(new AppError("Email Already exists", 400));

  const user = {
    email,
    name,
    password,
    confirmPassword,
    role,
    gender,
    photo,
  };

  const { activationToken, activationCode } = createActivationToken(user);

  const data = {
    user: { name: user.name },
    activationCode,
  };

  await new Email(user, data).activateRegistration();

  res.status(201).json({
    success: true,
    message: `Please check your email: ${user.email} to activate your account!`,
    activationCode,
    activationToken,
  });
});

// Sign Up the user - persist user data to database
export const activateUser = catchAsync(async (req, res, next) => {
  //   1) Getting token and check of it's there
  let activation_token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    activation_token = req.headers.authorization.split(" ")[1];
  } else {
    activation_token = req.body.activation_token;
  }

  const { activation_code } = req.body;

  const newUser = jwt.verify(activation_token, process.env.VERIFY_EMAIL_SECRET);

  if (newUser.activationCode != activation_code)
    return next(new AppError("Invalid token. Please try again", 401));

  const { email, name, password, confirmPassword, role, gender, photo } =
    newUser.user;

  let user = null;

  if (role === "patient") {
    user = await User.create({
      email,
      name,
      password,
      confirmPassword,
      role,
      gender,
      photo,
    });
  } else if (role === "doctor") {
    user = await Doctor.create({
      email,
      name,
      password,
      confirmPassword,
      role,
      gender,
      photo,
    });
  }

  sendToken(user, 201, res);
});

// Login the user
export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }

  // 2) Check if user exists && password is correct
  let user;

  const patient = await User.findOne({ email }).select("+password");
  const doctor = await Doctor.findOne({ email }).select("+password");

  if (patient) {
    user = patient;
  } else if (doctor) {
    user = doctor;
  }

  if (!user || !(await correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  // 3) If everything ok, send token to client
  sendToken(user, 200, res);
});

// update access token
export const refreshToken = catchAsync(async (req, res, next) => {
  let refresh_token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    refresh_token = req.headers.authorization.split(" ")[1];
  }

  const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN);

  if (!decoded) return next(new AppError("Could not refresh token", 400));

  let currentUser;

  //   if (decoded.role === "patient") {
  //     currentUser = await User.findById(decoded.id);
  //   } else if (decoded.role === "doctor") {
  //     currentUser = await Doctor.findById(decoded.id);
  //   }
  const patient = await User.findById(decoded.id);

  if (!patient) {
    const doctor = await Doctor.findById(decoded.id);
    currentUser = doctor;
  } else {
    currentUser = patient;
  }

  if (!currentUser)
    return next(new AppError("Please login to access these resources!", 400));

  // 4) Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  const accessToken = SignInAccessToken(
    currentUser._id,
    currentUser.role,
    "5m"
  );
  const refreshToken = SignInRefreshToken(
    currentUser._id,
    currentUser.role,
    "3d"
  );

  req.user = currentUser;

  //   // Set the Authorization header with the accessToken
  //   res.setHeader("Authorization", `Bearer ${accessToken}`);
  //   // Optionally, you can also send the refreshToken in a custom header
  //   res.setHeader("X-Refresh-Token", refreshToken);

  res.status(200).json({
    status: "success",
    accessToken,
    refreshToken,
  });
});

// update password
export const updatePassword = catchAsync(async (req, res, next) => {
  const { oldPassword, newPassword, passwordConfirm } = req.body;

  if (!oldPassword || !newPassword)
    return next(new AppError("Please provide your old and new passwords", 400));

  if (!passwordConfirm)
    return next(new AppError("Please confirm your password", 400));

  // 1) Get user from collection
  let user;

  const patient = await User.findById(req.user._id).select("+password");
  const doctor = await Doctor.findById(req.user._id).select("+password");

  if (patient) {
    user = patient;
  } else if (doctor) {
    user = doctor;
  }
 

  if (user?.password === "undefined") {
    return next(new AppError("Invalid user", 400));
  }
  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(oldPassword, user.password))) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  // 3) If so, update password
  user.password = newPassword;
  user.passwordConfirm = passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  res.status(200).json({
    success: true,
    user,
  });
});

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const { email } = req.body;

  let user;

  const patient = await User.findOne({ email });
  const doctor = await Doctor.findOne({ email });

  if (patient) {
    user = patient;
  } else if (doctor) {
    user = doctor;
  }

  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const data = {
      user: { name: user.name },
      resetToken,
      resetURL: `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/reset-password/${resetToken}`,
    };

    console.log(data.resetURL);

    await new Email(user, data).sendPasswordReset();

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        "There was an error sending the email. Try again later!",
        500
      )
    );
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  
    let user;

  const patient = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  const doctor = await Doctor.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });


  if (patient) {
    user = patient;
  } else if (doctor) {
    user = doctor;
  }


  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  res.status(200).json({
    status: "success",
    message:
      "Password reset successful. Please, log in with your new password.",
  });
  // sendToken(user, 200, res);
});

