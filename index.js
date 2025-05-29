import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import { userRouter } from './Routes/userRoutes.js';
import { errorHandler } from './MiddleWares/errorMiddlewares.js';
import { connectDB } from './config/connect.js';
import cors from 'cors';
import postRouter from './Routes/postRouter.js';
import { Server } from 'socket.io';
import http from 'http';

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

// HTTP server
const my_server = http.createServer(app);

// Socket.IO server
const io = new Server(my_server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Socket.IO logic
io.on('connection', (socket) => {
  console.log("Connected to socket.io: " + socket.id);

  socket.on('send_message', (data) => {
    console.log("Message received: ", data);

    // Broadcast the full message object
    socket.broadcast.emit('receive_message', {
      send: false,
      time: Date.now(),
      message: data.message,
    });
  });

  socket.on('disconnect', () => {
    console.log("Socket disconnected: " + socket.id);
  });
});

// Express routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5180;
my_server.listen(port, () => {
  console.log(`App is running on port: ${port}`);
});
