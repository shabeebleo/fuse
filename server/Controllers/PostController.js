import mongoose from "mongoose";
import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";

 import cloudinary from "../utils/cloudinary.js";
//create new post

export const createPost = async (req, res) => {
  console.log(req.file, "req.file latestt");
  const image = req.file;
  const { desc } = req.body;
  if (!desc || !image) {
    res.status(404);
    throw new Error("Upload data not found.");
  }
  console.log(req.body, "ffff-req.body-fffff");

  const newPost = new PostModel(req.body);
  console.log(newPost, "newPooooooooooostttt");

  try {
    console.log("try ethi")
    // const result = await cloudimage
    const result = await cloudinary.uploader.upload(
      image?.path,
    );
    console.log(result, "cloudinary resulttttt");
    newPost.image= result.secure_url,
    newPost.cloudinary_id= result.public_id
    await newPost.save();
    res.status(200).json("new post created");
  } catch (error) {

    console.log("malar catch ");
    console.log(error);
    res.status(500).json(error);
  }
};

//get a post

export const getPost = async (req, res) => {
  const Id = req.userId;

  console.log(Id, "bodyyyygetPos22");
  try {
    console.log(Id, "bodyyyygetPos24");
    const post = await PostModel.findById(Id);

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update  a  post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("post updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//delete a post

export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("post deleted");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

// like and dislike post

export const likePost = async (req, res) => {
  console.log("like ethi moneee")
  const postId = req.params.id;
  console.log(postId,"postid in like ")
  const  userId  = req.userId;

  
  console.log(userId,"userId in like ")
  try {
    const post = await PostModel.findById(postId);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("post liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("post disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//get timeline post

export const getTimelinePosts = async (req, res) => {
  console.log("userId in timeline post");
  const userId = req.userId;
  console.log(userId, "userId in timeline post");
  try {
    console.log("try ethi timeline");
    const currentUserPosts = await PostModel.find({ userId: userId }).populate('userId');
    console.log("new current posts")
    console.log(currentUserPosts, "currentUserPosts");
    const followingPosts = await UserModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingposts",
        },
      },
      {
        $project: {
          followingposts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts.concat(followingPosts[0].followingposts).sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );
  } catch (error) {
    console.log("catch ethi timeline");
    res.status(500).json(error);
  }
};
