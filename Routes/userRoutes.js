import express from 'express'
import { registerUser } from '../Controllers/userController.js';
export const userRouter = express.Router();


userRouter.post("/register", registerUser)

