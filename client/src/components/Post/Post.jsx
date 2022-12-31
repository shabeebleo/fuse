import React, { useEffect, useState } from "react";
import "./Post.css";
import Comment from "../../img/comment.png";
import Share from "../../img/share.png";
import Heart from "../../img/like.png";
import Notlike from "../../img/notlike.png";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { UilTimes } from "@iconscout/react-unicons";
import { setPosts } from "../../redux/postSlice";
import { hideloading, showloading } from "../../redux/alertSlice";
function Post({ data }) {


  const dispatch = useDispatch();
  // console.log(data, "daaaaaaaaata");
  const [liked, setLiked] = useState();
  const [likes, setlikes] = useState(data.likes.length);
  const { userData } = useSelector((state) => state.user);
  const [nwComment, setnwComment] = useState(false);
  const [allComments, setallComments] = useState([]);
  const userId = userData?._id;
  const username = data.userId.username;
  // console.log(username, "usernaaaaaaaaaaaaame");
  const postId = data._id;
  // console.log(userId, "for likepost");
  useEffect(() => {
    if (data.likes.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [data]);

  const likeUnlikePost = async () => {
    setLiked(!liked);

    if (liked && likes === 0) {
      setlikes((prev) => prev);
    } else if (liked && likes !== 0) {
      setlikes((prev) => prev - 1);
    } else {
      setlikes((prev) => prev + 1);
    }
    try {
      // console.log(liked, "liked");
      // console.log(likes, "likes");
      const response = await axios.put(`/posts/${data._id}/like`, userId, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      // console.log(response, "responseeeeeee,likePosttt");
    } catch (error) {
      console.log(error);
    }
  };

  const getAllPosts = async () => {
    try {
      const response = await axios.get("/posts/timeline", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data,"post response ")
      dispatch(setPosts(response.data));
    } catch (error) {}
  };

  useEffect(() => {
    getAllPosts();
  }, []);









//new comment
  const newComment = async () => {
    const comment = document.getElementById("nwComment").value;

    const postId = data._id;
    const username = data.userId.username;
    const commentData = {};
    commentData.comment = comment;
    commentData.postId = postId;
    // console.log(
    //   comment,
    //   "comment ethi mone",
    //   commentData,
    //   "commentData ethi mone"
    // );

    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const response = await axios.post(
        `/posts/${username}/commentPost`,
        commentData,
        config
      );
      // console.log(response, "responseeeeeeee");
      setallComments([response.data, ...allComments]);
      // console.log(
      //   allComments,
      //   "after new cokmment allCommentsallCommentsallCommentsallCommentsallCommentsallCommentsallCommentsallComments"
      // );
    } catch (error) {
      console.log(error);
    }
  };

  //deleteComments

  const deleteComments = async (commentId) => {
    // console.log(username, "username in delete commets");
    try {
     
      const response = await axios.post(
        `/posts/delete/${commentId}`,
        {username:username}
      );
document.getElementById(commentId).style.display="none"
      // console.log(response, "delete response");
    } catch (error) {
      console.log(error);
    }

  };

  //getComments
  const getComments = async () => {
    setnwComment(true);
    // console.log("alll commmeeentsssssssssssssssss");
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      };
      const response = await axios.get(`posts/${postId}/allComments`, config);

      // console.log(response, "alllcomements response");
      const sortedComments = response.data.sort(function (a, b) {
        return b.date - a.date;
      });
      // console.log(response.data, "sortedComments");

      setallComments(sortedComments);
    } catch (error) {}
  };
  // console.log(
  //   allComments,
  //   "allCommentsallCommentsallCommentsallCommentsallCommentsallComments"
  // );

 const postDelete=async()=>{

  try {
    dispatch(showloading());
    const response=await axios.delete(`/posts/${postId}`, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    })
    dispatch(hideloading());
    console.log(response,"user deleting response")
  } catch (error) {
    console.log(error)
  }
 getAllPosts();

 }

  return (
    <div className="Post">
      <h4>{data.userId.username}</h4>
      <div className="Post">
        <div className="PostDelete">
        <UilTimes
              onClick={
                postDelete
              }
              
              
            />
        </div>
    
      <img src={data.image} alt="" />
      </div>
      <div className="postReact">
        <img onClick={likeUnlikePost} src={liked ? Heart : Notlike} alt="" />
        <img onClick={getComments} src={Comment} alt="" />

        <img src={Share} alt="" />
      </div>
      <span style={{ color: "var(--gray)", fontSize: "12px" }}>
        {" "}
        <h6>{data.likes.length === 1 ? `${likes} like` : `${likes} likes`} </h6>
      </span>
      <div className="details">
        <span>
          <b>{data.name}</b>
        </span>
        <span> {data.desc}</span>
      </div>

      {nwComment && (
        <div className="commentInput">
          <input id="nwComment" className="comment" type="text" />
          <button className="commentButton" onClick={newComment} type="submit">
            comment
          </button>
          <div>
            <UilTimes
              onClick={() => {
                setnwComment(false);
                setallComments(null);
              }}
            />
          </div>
        </div>
      )}
      {allComments &&
        allComments.map((commentData) => {
          return (
            <div id={commentData._id} className="comments">
              <h6>{commentData.username}</h6>

              <input
                value={commentData.comment}
                id="comments"
                className="allComments"
                type="text"
              />
              <div>
                <UilTimes
                  onClick={() => {
                    deleteComments(commentData._id);
                  }}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Post;
