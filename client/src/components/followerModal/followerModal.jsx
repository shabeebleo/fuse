import React, { useEffect, useState } from "react";
import { Modal, useMantineTheme } from "@mantine/core";
import { useSelector } from "react-redux";
import axios from "axios";
import "./FollowerModal.css";
export const FollowerModal = ({ modalOpened, setModalOpened ,profileUserId}) => {
    console.log(profileUserId,"profileUserId.............")
  const { userData } = useSelector((state) => state.user);
  console.log(userData,"userData in followerModalllll")
  const userId = userData?._id;
  const [users, setUsers] = useState([]);
  const [followers, setFollowers] = useState([])
  const theme = useMantineTheme();

  const getAllUsers = async () => {
    try {
      const response = await axios.get("/user/getAllUsers");
      console.log(response.data, "all userssssssssss.........");
      setUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  };
//   const getFollowers=async()=>{
//     try {
//         const response = await axios.get("/user/followers");
//         console.log(response.data, "all followers.........");
//         setFollowers(response.data);
//       } catch (error) {
//         console.log(error);
//       }
// }


//to get follower data.....
  const getFollowers = async () => {
    try {
      const response = await axios.get(`/user/followers/${profileUserId?profileUserId:userId}`,{
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token")
        },
      });

      console.log(response.data,"getData ethi mon     getFollowersgetFollowersgetFollowersgetFollowersgetFollowers");
      setFollowers(response.data)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFollowers();
  }, [userData]);
  console.log(
    users,
    "users ...................................in followermodal"
  );


  useEffect(() => {
    getAllUsers();
  }, [userData]);
  console.log(
    users,
    "users ...................................in followermodal"
  );
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="30%"
      opened={modalOpened}
      onClose={() => {
        setModalOpened(false);
      }}
    >
      <div className="FollowersCard">followerModal
      {followers.map((follower, id) => {
        return (
          <div className="follower">
            <div>

            <img src={follower.profilePicture} className="followerImg" alt="" />
            </div>
            <div className="name">
              
                <span>{follower.firstname}</span>
           
                <span>@{follower.username}</span>
              
            </div>
          </div>
        );
      })}
      </div>
    
    </Modal>
  );
};
