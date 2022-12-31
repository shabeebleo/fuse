import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
// import { Followers } from "../../Data/FollowersData";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function FollowersCard() {
  const { userData } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  // const [followingId, setfollowingId] = useState();
  // const [followButton, setfollowButton] = useState(false);
  const userId = userData;
  const currentUserId = userData?._id;
  const navigate = useNavigate();

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/user/getAllUsers");
      console.log(response.data, "all userssssssssss.........");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, [userId]);

  console.log(users, "users .................. frdom............... state");

  const followUnfollow = async (id, follower) => {
    try {
      const response = await axios.put(`user/${id}/follow`, id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      //  response.data=='user followed'?setfollowButton(true):setfollowButton(false)
      // follower.followers.includes(currentUserId)?setfollowButton(true):setfollowButton(false)
    } catch (error) {
      console.log(error);
    }
    getAllUsers();
  };

  const openProfile = (user) => {
    console.log(
      user,
      "openProfileopenProfileopenProfileopenProfileopenProfile-------userId"
    );
    navigate("/profile", {
      state: {
        userData: user,
      },
    });
  };  

  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>
      {users.map((follower, id) => {
        return (
          <div className="follower" key={id}>
            <div>
              <img
                onClick={() => {
                  openProfile(follower);
                }}
                src={follower.profilePicture}
                className="followerImg"
                alt=""
              />
              <div className="name">
                {/* <span>{follower.firstname}</span> */}
                <span>@{follower.username}</span>
              </div>
            </div>
            <div>
            <button
              className="button fc-button"
              onClick={() => {
                followUnfollow(follower._id, follower);
              }}
            >
              {follower.followers.includes(currentUserId)
                ? "following"
                : "follow"}
             
            </button>
            </div>
          
          </div>
        );
      })}
    </div>
  );
}

export default FollowersCard;
