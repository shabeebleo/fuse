import React, { useState } from 'react'
import './RightSide.css'
import Home from '../../img/home.png'
import Noti from '../../img/noti.png'
import { useNavigate } from "react-router-dom";
import Comment from '../../img/comment.png'
import { UilSetting } from '@iconscout/react-unicons'

import ShareModal from '../ShareModal/ShareModal'
import logOut from '../../img/logOut.png'
function RightSide() {
    const navigate = useNavigate();
    const logOutt = () => {
        localStorage.removeItem("token");
        navigate("/");
      };
    const [modalOpened, setModalOpened] = useState(false)
    return (
        <div className='RightSide'>
            <div className="navIcons">
                <img src={Home} alt="" />
                <img src={Noti} alt="" />
                <img onClick={()=>{navigate("/chat")}} src={Comment} alt="" />
                {/* <UilSetting /> */}
                <img onClick={logOutt} src={logOut} alt="" />
            </div>
           
          
        </div>
    )
}

export default RightSide