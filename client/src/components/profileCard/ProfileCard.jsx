import React, { useEffect, useState } from "react";
import "./ProfileCard.css";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function ProfileCard() {
  const location = useLocation();
  const [modalOpened, setModalOpened] = useState(false);
  let profileDetails = location?.state?.userData;
  var { userData } = useSelector((state) => state.user);
  const { postData } = useSelector((state) => state.posts);
  const ProfilePage = true;

  ///followeresw modal
  const followers = () => {

  };

  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        <img
          src={
            profileDetails
              ? profileDetails.coverPicture
              : userData?.coverPicture
          }
          alt=""
        />
        <img
          src={
            profileDetails
              ? profileDetails.profilePicture
              : userData?.profilePicture
          }
          alt=""
        />
      </div>
      <div className="ProfileName">
        <span>{userData?.firstname}</span>
        <span>{userData?.worksat}</span>
      </div>
      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span onClick={followers}>followers </span>
            <span>{userData?.followers.length}</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>following</span>
            <span>{userData?.following.length}</span>
          </div>
          {ProfilePage && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>Posts</span>
                <span>{postData?.length}</span>
              </div>
            </>
          )}
        </div>

        <hr />
      </div>
      {ProfilePage ? "" : <span>My profile</span>}
    </div>
  );
}

export default ProfileCard;
