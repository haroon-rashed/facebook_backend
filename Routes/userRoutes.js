import express from 'express'
import { allUsers, getUserInfo, loginUser, registerUser, verifyUser } from '../Controllers/userController.js';
export const userRouter = express.Router();


userRouter.post("/register", registerUser)
userRouter.post("/login_user", loginUser)
userRouter.post("/verify/:user_id", verifyUser)
userRouter.get('/my-info/:user_id', getUserInfo)
userRouter.get('/get-users', allUsers)
