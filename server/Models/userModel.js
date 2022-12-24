import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      requires: true,
    },
    password: {
      type: String,
      required: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    
    email: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    posts: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Posts",
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesin: String,
    worksat: String,
    relationship: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
)

export default mongoose.model("User",UserSchema);

