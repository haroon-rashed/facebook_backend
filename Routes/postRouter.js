import express from 'express';
import { addComments, addPost, getPosts, getReactions, makeReaction } from '../Controllers/postController.js';
import { authHandler } from '../MiddleWares/authMiddleware.js';

const postRouter = express.Router();


postRouter.post('/add_post/:user_id', addPost);
postRouter.get('/get-all-posts', getPosts);
postRouter.post('/add-reaction/:post_id/:user_id', makeReaction)
postRouter.get("/get-reactions/:post_id", getReactions)
postRouter.post("/add-comment/:post_id", authHandler, addComments)

export default postRouter;