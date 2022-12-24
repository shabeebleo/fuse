import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
//get a user

export const getUser = async (req, res) => {


const id=req.userId
  try {
    const user = await UserModel.findById(id).select("-password");
    
    if (user) {
      const userDetails = user._doc;

      res.status(200).json(userDetails);
    } else {

      res.status(404).json("user does't exist");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//get all users

export const getAllUsers = async (req, res) => {

console.log("getAllUSErs")

    try {
      const allUsers = await UserModel.find().select("-password");
      console.log(allUsers,"allUSersssss")
      if (allUsers) {
  //       const userDetails = allUsers._doc;
  // console.log(userDetails,"userDetailsss............")
        res.status(200).json(allUsers);
      } else {
  
        res.status(404).json("user does't exist");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  };






//update user

export const updateUser = async (req, res) => {
  const id = req.params.id;

  const { currentUserId, currentUserAdminStatus, password } = req.body;

  if (id === currentUserId || currentUserAdminStatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you can only update your account");
  }
};

//delete user

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, currentUserAdminStatus } = req.body;
  if (currentUserId === id || currentUserAdminStatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("account deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Accses denied! you can only delete your account");
  }
};

//follow user

export const followUnFollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (currentUserId == id) {
    res.status(403).json("action forbidden");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);
      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("user followed");
      } else{
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("user unfollowed");

      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
