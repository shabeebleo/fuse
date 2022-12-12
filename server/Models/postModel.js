import mongoose from "mongoose";

const PostSchema = mongoose.Schema(
  {
    userId: { type: String, required: true },
    desc: String,
    image: String,
    likes: [],
  },
  {
    timestamps: true,
  }
);

const PostModel=mongoose.model("Posts",PostSchema);
export default PostModel
