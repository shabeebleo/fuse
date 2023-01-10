import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import UserModel from "../Models/userModel.js";

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password, "login admin");

  //check admin email

  const admin = {
    email: "admin@gmail.com",
    password: "10",
    name: "Admin",
  };
  if (email == admin.email && password == admin.password) {
    res.json({
      name: admin.name,
      email: admin.email,
      adminToken: generateToken(admin.name),
      success: true,
    });
  } else {
    res.status(400);
    throw new Error("invalid credentials");
  }
};

//get all users

export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      status: "success",
      message: "Users data retrieved successfully.",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500);
    throw new Error("Error getting all users");
  }
});

//user Status Change

export const userStatusChange=asyncHandler(async(req,res)=>{
    console.log("userStatusChange ethi")
    const userId=req.params.id
    console.log(userId ,"userId in user status chanfe")
    try {
        const user=await UserModel.findById(userId)
        if(user){
        user.isBlocked =!user.isBlocked;
        }
        await user.save();
        console.log(user,'user data after update')
        res.status(200).json({
          status: "success",
          message: "User updated successfully.",
          data:user
        })
       
    } catch (error) {
        console.log(error)
        res.status(500);
        throw new Error("Error getting all users");
    }
}

)



//generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};
