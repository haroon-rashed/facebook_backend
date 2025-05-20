import { Post } from "../Models/postModel.js";

export const addPost = async (req, res) => {
  const { caption, background, uploadImage } = req.body;
  const { user_id } = req.params;

  // if (!caption) {
  //   return res.status(400).json({ message: "Please add a caption" });
  // }

  try {
    const newPost = await Post.create({
      caption,
      background,
      user_id,
      uploadImage
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error while creating post" });
  }
};


export const getPosts = async (req, res) =>{
  const allPosts = await Post.find().sort({createdAt : -1});
  res.send(allPosts)
}

export const makeReaction = async (req, res) => {
  const { type } = req.body; 
  const { post_id, user_id } = req.params;

  try {
    const findPost = await Post.findById(post_id);

    if (!findPost) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userReactionIndex = findPost.likes.findIndex((item) => item.id == user_id);

    if (userReactionIndex === -1) {
      findPost.likes.push({ type, id: user_id });
    } else {
      findPost.likes[userReactionIndex].type = type;
    }

    await findPost.save();

    res.status(200).json(findPost);
  } catch (error) {
    console.error("Error making reaction:", error);
    res.status(500).json({ message: "Server error while making reaction" });
  }
};


export const getReactions = async(req, res)=>{
  const {post_id} = req.params;

  const findPost = await Post.findById(post_id);
  if(!findPost){
   res.status(404)
    throw new Error('Post not found')
  }

  res.send(findPost.likes)
}


export const addComments = async (req, res) =>{
    const {post_id} = req.params;
    const {user_id} = req.user._id
    const {comment} = req.body;

    const findPost = await Post.findById(post_id)

    if(!findPost){
      res.status(404)
      throw new Error("Post not found")
    }

    findPost.comments.push({user: req.user, comment, post_id})

    await findPost.save()
    res.send(findPost)
}