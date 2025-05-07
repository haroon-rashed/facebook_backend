import express from 'express';
import { addPost, getPosts } from '../Controllers/postController.js';

const postRouter = express.Router();


postRouter.post('/add_post/:user_id', addPost);
postRouter.get('/get-all-posts', getPosts);

export default postRouter;