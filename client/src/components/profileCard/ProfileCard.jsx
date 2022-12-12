import React from 'react'
import Cover from '../../img/cover.jpg'
import Profile from '../../img/profileImg.jpg'
import './ProfileCard.css'
function ProfileCard() {

    const ProfilePage = true
    return (
        <div className='ProfileCard'>
            <div className="ProfileImages">
                <img src={Cover} alt="" />
                <img src={Profile} alt="" />
            </div>
            <div className="ProfileName">
                <span>Leo Messi</span>
                <span>Footballer</span>
            </div>
            <div className="followStatus">
                <hr />
                <div>
                    <div className="follow">
                        <span>followers </span>
                        <span>7878</span>

                    </div>
                    <div className="vl">
                    </div>
                    <div className="follow">
                        <span>following</span>
                        <span>7</span>

                    </div>
                    {ProfilePage && (
                        <>
                            <div className="vl">

                            </div>
                            <div className="follow">
                                <span>3</span>
                                <span>Posts</span>
                            </div>
                        </>
                    )}
                </div>

                <hr />
            </div>
            {ProfilePage ? '' : <span>My profile</span>}
          
        

        </div>
    )
}

export default ProfileCard