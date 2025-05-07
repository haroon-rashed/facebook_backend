import express from 'express'
import { loginUser, registerUser, verifyUser } from '../Controllers/userController.js';
export const userRouter = express.Router();


userRouter.post("/register", registerUser)
userRouter.post("/login_user", loginUser)
userRouter.post("/verify/:user_id", verifyUser)

