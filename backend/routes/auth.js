//routes regarding auhenticaion of users
const express = require('express');
const { registerController, verifyController,forgetPassword,forgetPasswordOtp,verifyForgetPasswordOtp, resendOtp,loginController, logoutController} = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth');
const authRouter = express.Router();

authRouter.post("/register",registerController);
authRouter.post("/verify",verifyController);
authRouter.post("/reshare/otp",resendOtp);
authRouter.post("/forget/password/otp",forgetPasswordOtp);
authRouter.post("/verify/forget/otp",verifyForgetPasswordOtp);
authRouter.post("/forget/password",forgetPassword);

authRouter.post("/login",loginController);
authRouter.put("/logout",authMiddleware,logoutController);



module.exports = authRouter;