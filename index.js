import dotenv from 'dotenv'
dotenv.config();
import express from 'express'
import{ userRouter }from './Routes/userRoutes.js';
import { errorHandler } from './MiddleWares/errorMiddlewares.js';
import { connectDB } from './config/connect.js';
import cors from 'cors'

connectDB();

const app = express();
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(cors())

app.use('/api/users', userRouter)
app.use(errorHandler)


const port = process.env.PORT;
app.listen(port, () => console.log(`App is running on port: ${port}`));