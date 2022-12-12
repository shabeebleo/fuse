import UserModel from "../Models/userModel.js";
import bcrypt, { genSalt, hash } from 'bcrypt'



//registering a new user

export const  registerUser = async (req, res) => {
  const { username, password, firstname, lastname } = req.body;
const salt= await genSalt(10)
const hashpass=await hash(password,salt)

  const newUser = new UserModel({ username, password:hashpass, firstname, lastname });

  try {
    await newUser.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//login user 

export const loginUser= async(req,res)=>{
  const{username,password}=req.body
try {
  const user=await UserModel.findOne({username:username})
if(user){
  const valid=await bcrypt.compare(password,user.password)
  valid?res.status(200).json(user):res.status(400).json("wrong password ")
}else{
  res.status(404).json("user not found")
}
} catch (error) {
  res.status(500).json({ message: error.message });
}

}
