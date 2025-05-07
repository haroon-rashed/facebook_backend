import { Post } from "../Models/postModel.js";

export const addPost = async (req, res) => {
  const { caption, background } = req.body;
  const { user_id } = req.params;

  if (!caption) {
    return res.status(400).json({ message: "Please add a caption" });
  }

  try {
    const newPost = await Post.create({
      caption,
      background,
      user_id,
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ message: "Server error while creating post" });
  }
};


export const getPosts = async (req, res) =>{
  const allPosts = await Post.find();
  res.send(allPosts)
}