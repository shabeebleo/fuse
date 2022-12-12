import React,{useState} from 'react'
import './InfoCard.css'
import { UilPen } from '@iconscout/react-unicons'
import ProfileModal from '../ProfileModal/ProfileModal'
function InfoCard() {
    const [modalOpened,setModalOpened]=useState(false)
    return (
        <div className='InfoCard'>
            <div className="InfoHead">
                <h4>Your Info</h4>
                <div>
                    <UilPen width='2rem' hieght='1.2rem' onClick={()=>{setModalOpened(true)}} />
                    <ProfileModal
                    modalOpened={modalOpened}
                    setModalOpened={setModalOpened}
                     />
                </div>
            </div>
            <div className="info">
                <span>
                    <b>Status </b>
                </span>
                <span>In  Relationship</span>
            </div>
            <div className="info">
                <span>
                    <b>Lives in </b>
                </span>
                <span>Paris</span>
            </div>
            <div className="info">
                <span>
                    <b>Works At </b>
                </span>
                <span>PSG</span>
            </div>
            <button className='button logout-button'>
                LogOut
            </button>
        </div>
    )
}

export default InfoCard