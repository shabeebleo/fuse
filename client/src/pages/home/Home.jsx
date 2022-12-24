// import axios from "axios";
// import React,{useEffect,useState} from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/profileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";

function Home() {
  // const getData = async () => {
  //   try {
  //     const response = await axios.get('/user',{
  //       headers: {
  //         Authorization: "Bearer " + localStorage.getItem("token")
  //       },
  //     });

  //     console.log(response.data,"getData ethi mon");
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData()
  // }, [])

  return (
    <div className="Home">
      <ProfileSide />
      <PostSide />
      <RightSide />
    </div>
  );
}

export default Home;
