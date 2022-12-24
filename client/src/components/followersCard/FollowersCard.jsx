import React, { useEffect, useState } from "react";
import "./FollowersCard.css";
import { Followers } from "../../Data/FollowersData";
import axios from "axios";
import { useSelector } from "react-redux";
function FollowersCard() {
  const { userData } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const userId = userData;
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

  console.log(users, "users frdom state");

  // const followUnfollow = async () => {
  //   try {
  //     const response = await axios.put(`user/${userId}/follow`, {
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token"),
  //       },
  //     });

  //     console.log(response,"response of follow")
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  console.log(Followers, "followerssss");
  return (
    <div className="FollowersCard">
      <h3>Who is following you</h3>
      {users.map((follower, id) => {
        return (
          <div className="follower" key={id}>
            <div>
              <img src className="followerImg" alt="" />
              <div className="name">
                <span>{follower.firstname}</span>
                <span>@{follower.username}</span>
              </div>
            </div>
            <button className="button fc-button">
              {/* onClick={followUnfollow} */}
              follow
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default FollowersCard;
