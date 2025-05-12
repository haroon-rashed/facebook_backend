import express from 'express';
import { addPost, getPosts, makeReaction } from '../Controllers/postController.js';

const postRouter = express.Router();


postRouter.post('/add_post/:user_id', addPost);
postRouter.get('/get-all-posts', getPosts);
postRouter.post('/add-reaction/:post_id/:user_id', makeReaction)

export default postRouter;