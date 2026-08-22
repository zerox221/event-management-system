//routes regarding auhenticaion of users
const express = require('express');
const { registerController, verifyController, loginController, logoutController} = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth');
const authRouter = express.Router();

authRouter.post("/register",registerController);
authRouter.post("/verify",verifyController);

authRouter.post("/login",loginController);
authRouter.put("/logout",authMiddleware,logoutController);


module.exports = authRouter;