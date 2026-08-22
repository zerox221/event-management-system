const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv");

exports.authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "invalid Token",
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      error: error.message,
      message: "error in auth middleware",
    });
  }
};

exports.isOrganizer = async (req, res, next) => {
  try {
    const { id } = req.user;

    const checkUser = await User.findById(id);

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "user not exists please login again",
      });
    }

    if (checkUser.role === "organizer") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "this is a protected route for organizer",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success : false,
        message : "internal server error in isOrganizer middleware",
        error : error.message,
    })
  }
};

exports.isUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    const checkUser = await User.findById(id);

    if (!checkUser) {
      return res.status(401).json({
        success: false,
        message: "user not exists please login again",
      });
    }

    if (checkUser.role === "user") {
      next();
    } else {
      return res.status(401).json({
        success: false,
        message: "this is a protected route for user",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
        success : false,
        message : "internal server error in isOrganizer middleware",
        error : error.message,
    })
  }
};
