import express from "express";
import * as authController from "./auth.controller.js"
import { validation } from "../../utils/middleware/validation.js";
import { createUserSchema } from "../user/user.validator.js";
import { changeMyPasswordSchema, forgotPasswordSchema, resetPasswordSchema, signInSchema, verifyRessetCodeSchema } from "./auth.validator.js";
import { uploadSingleFile } from "../../utils/middleware/fileUploads.js";
const authRouter = express.Router();

authRouter.post("/signup",uploadSingleFile('id','idDocument'),validation(createUserSchema),authController.signUp);
authRouter.post("/logout",authController.logOut);
authRouter.post("/signin",validation(signInSchema),authController.signIn);
authRouter.get('/verify/:token',authController.verifyEmail);
authRouter.post('/forgotPassword',validation(forgotPasswordSchema),authController.forgotPassword);
authRouter.post('/verifyRessetCode',validation(verifyRessetCodeSchema),authController.verifyRessetCode);
authRouter.patch('/changeMyPassword',validation(changeMyPasswordSchema),authController.changeMyPassword);
authRouter.patch('/resetPassword',validation(resetPasswordSchema),authController.ressetPassword);

export default authRouter;