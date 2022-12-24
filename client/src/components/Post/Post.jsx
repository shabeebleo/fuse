import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import Notlike from "../../img/notlike.png";
import axios from "axios";
import { useSelector } from "react-redux";

function Post({ data }) {
  const [liked ,setLiked]=useState()
  const [likes,setlikes]=useState(data.likes.length)
  const { userData } = useSelector((state) => state.user);

  const userId = userData?._id;
  console.log(userId ,"for likepost")
  useEffect(() => {
    if(data.likes.length>0){
      setLiked(true)
    }else{
      setLiked(false)
    }
   
  }, [data])
  
  const likeUnlikePost = async () => {
    setLiked(!liked)

    if(liked&&likes==0){
      setlikes((prev)=>prev)
    }else if (liked&&likes!=0){
      setlikes((prev)=>prev-1)
    }else {
      setlikes((prev)=>prev+1)
    }
    try {
      console.log(liked,"liked")
      console.log(likes,"likes")
      const response = await axios.put(`/posts/${data._id}/like`,userId,{
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          }
        });
  
      console.log(response,"responseeeeeee,likePosttt")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Post">
      <h4>{data.userId.username}</h4>
      <img src={data.image} alt="" />
      <div className="postReact">
        <img
          onClick={likeUnlikePost}
          src={liked ?Heart  : Notlike }
          alt=""
        />
        <img src={Comment} alt="" />
        <img src={Share} alt="" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {" "}
        <h6>{data.likes.length==1?`${likes} like`:`${likes} likes`} </h6>
      </span>
      <div className="details">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>
    </div>
  );
}

export default Post;
