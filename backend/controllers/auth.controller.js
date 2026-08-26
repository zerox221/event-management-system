const User = require("../models/User");
const bcrypt = require("bcrypt");
const otpGenrator = require("otp-genrator");
const TempUser = require("../models/TempUser");
const jwt = require("jsonwebtoken");
const { sendMessage } = require("../services/Email");
const ForgetPassword = require("../models/ForgetPassword");
const forgetPasswordOtp = require("../services/ShareForgetPasswordOtp");
require("dotenv").config();

exports.registerController = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //validate is information empty or not
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "Field are empty please enter details",
      });
    }

    //check wheather the User already present or not
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exits with this email",
      });
    }

    //if user not exists genrate an otp and save it to temp user collection using nodamailer or otp genrator

    const otp = await otpGenrator.OTPGeneration(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //find the collection if not present it will create and add
    // otp to it using unsert true it will behave like if the docs is present
    // it will update otherwise it will create

    const hashedPassword = await bcrypt.hash(password, 10);

    const saveData = await TempUser.findOneAndUpdate(
      { email },
      {
        name,
        email,
        password: hashedPassword,
        otp,
        expiresIn: Date.now() + 2 * 60 * 1000,
        role,
        profile: {
          url: `https://api.dicebear.com/10.x/initials/svg?seed=${name}`,
          publicID: Math.floor(Math.random() * 10).toString(),
        },
      },
      {
        upsert: true,
        returnDocument: "after",
      },
    );
    sendMessage(otp, email);

    res.status(200).json({
      success: true,
      message: "user not veryfied yet",
      email: email,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "their is error in register handler",
      error: error.message,
    });
  }
};

exports.verifyController = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
    }

    const findUser = await TempUser.findOne({ email });

    if (!findUser) {
      return res.status(404).json({
        success: false,
        message: "user not exists",
      });
    }

    if (findUser.expiresIn < Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP exired",
      });
    }

    if (otp === findUser.otp) {
      //create user in main db
      const user = await User.create({
        name: findUser.name,
        email: findUser.email,
        password: findUser.password,
        profile: findUser.profile,
        role: findUser.role,
      });

      const deleteUser = await TempUser.deleteOne({ email });
      //create a payload for jwt

      const payload = {
        id: user._id,
        email: user.email,
      };

      //make a token using jwt
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });

      //send token using cookie
      res.cookie("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      res.status(200).json({
        success: true,
        message: "user register successfullt",
        user: {
          name: user.name,
          email: user.email,
          id: user._id,
          role: user.role,
        },
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Otp not matched",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "something went wrong in the verification handler",
      error: error.message,
    });
  }
};

exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
    }
    //find user in user collection wheather user is present or not ;
    const checkUser = await User.findOne({ email });

    //if not present return with response
    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "user not exist with this email or password",
      });
    }
    //if present compare passwords
    const comparePassword = await bcrypt.compare(password, checkUser.password);
    //if password is correct we will genrate a token and send it to client in cookie
    if (comparePassword) {
      const payload = {
        id: checkUser._id,
        email: checkUser.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "10d",
      });

      res.cookie("token", token, {
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });

      return res.status(200).json({
        success: true,
        message: "login successfully",
        user: {
          email: checkUser.email,
          name: checkUser.name,
          role: checkUser.role,
          id: checkUser._id,
        },
      });
    } else {
      return res.status(401).json({
        success: true,
        message: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "their is internal server error in login controller",
      error: error.message,
    });
  }
};

exports.logoutController = async (req, res) => {
  try {
    const { id } = req.user;

    const checkUser = await User.findById(id);
    if (!checkUser) {
      return res.status(400).json({
        success: false,
        message: "user not found",
      });
    }
    res.clearCookie("token");

    res.status(200).json({
      success: true,
      message: "Log out successfully",
      user: checkUser.name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "not able to log out errorin log out controller",
      error: error.message,
    });
  }
};

exports.resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
    }
    const newOtp = await otpGenrator.OTPGeneration(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    if (!newOtp) {
      return res.status(403).json({
        success: false,
        message: "server error cannot gernate otp",
      });
    }
    const userOtp = await TempUser.findOneAndUpdate(
      { email },
      {
        otp: newOtp,
      },
    );

    sendMessage(newOtp, email);

    if (!userOtp) {
      return res.status(400).json({
        success: false,
        message:
          "your details are expired please go to Signup page and create account again",
      });
    }
    res.status(200).json({
      success: true,
      message: "otp has been sent",
    });
  } catch (error) {
    console.log("error in send otp controller : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.forgetPasswordOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(500).json({
        success: false,
        message: "please fill all the fields",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "you dont have account please register first",
      });
    }
    const otp = await otpGenrator.OTPGeneration(6, {
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
    });

    await ForgetPassword.findOneAndUpdate(
      { email },
      {
        email: email,
        otp: otp,
      },
      { upsert: true },
      { returnDocument: "after" },
    );

    forgetPasswordOtp(email,otp);

    res.status(200).json({
      success: true,
      message: "otp has been sent",
    });
  } catch (error) {
    console.log("error in forgetPassword handler : ", error.message);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.verifyForgetPasswordOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      res.status(400).json({
        success: false,
        message: "please fill all the details",
      });
    }

    const isItRealUser = await ForgetPassword.findOne({email});

    if(!isItRealUser){
      return res.status(400).json({
        success : false,
        message : "first verify the otp"
      })
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "user not exists with this email",
      });
    }

    const ForgetPasswordOtp = await ForgetPassword.findOne({ email });
    if (!ForgetPasswordOtp) {
      return res.status(400).json({
        success: false,
        message: "otp is expired",
      });
    }
    if (otp === ForgetPasswordOtp.otp) {
      return res.status(200).json({
        success: true,
        message: "otp matched",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "otp is not matched",
      });
    }
  } catch (error) {
    console.log("error in forget passsword otp handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!newPassword || !email) {
      res.status(400).json({
        success: false,
        message: "please fill all the fields",
      });
    }

    const IsUserRequestedForForgetPassword = await ForgetPassword.findOne({
      email,
    });

    if (!IsUserRequestedForForgetPassword) {
      return res.status(400).json({
        success: false,
        message: "user do not have permisson to change the password first verify it with otp",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "user not exists",
      });
    }
    const comparePassword = await bcrypt.compare(newPassword, user.password);
    if (comparePassword) {
      return res.status(400).json({
        success: false,
        message: "enter different password from your previous password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.findOneAndUpdate({ email }, { password: hashedPassword });

    res.status(200).json({
      success: false,
      message: "password updated successfully",
    });
  } catch (error) {
    console.log("error in forget password handler : ", error.message);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
