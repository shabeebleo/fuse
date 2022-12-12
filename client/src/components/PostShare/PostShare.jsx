import React ,{useState,useRef} from 'react'
import Profile from '../../img/profileImg.jpg'
import './Postshare.css'
import { UilScenery } from '@iconscout/react-unicons'
import { UilPlayCircle } from '@iconscout/react-unicons'
import { UilLocationPoint } from '@iconscout/react-unicons'
import { UilSchedule } from '@iconscout/react-unicons'
import { UilTimes } from '@iconscout/react-unicons'

function PostShare() {
const [image,setImage]=useState(null)
const imageRef=useRef(null)
const onImageChange=(event)=>{
if(event.target.files && event.target.files[0]){
    let img=event.target.files[0]
    setImage ({
        image:URL.createObjectURL(img)
    })
}
}
    return (
        <div className='PostShare'>
            <img src={Profile} alt="" />
            <div>
                <input type="text"
                    placeholder="what's happening" />
                <div className='postOptions'>
                    <div className="options" style={{color:'var(--photo)'}}
                    onClick={()=> imageRef.current.click()}>
                        <UilScenery />
                        Photo
                    </div>
                    <div className="options" style={{color:'var(--video)'}}>
                        <UilPlayCircle />
                        Video
                    </div>
                    <div className="options" style={{color:'var(--location)'}}>
                        <UilLocationPoint />
                        Location
                    </div>
                    <div className="options" style={{color:'var(--teal)'}}>
                        <UilSchedule />
                        Schedule
                    </div>
                    <button className='button ps-button' style={{height:'2rem',width:'4.5rem'}}>
                        share
                    </button>
                    <div style={{display:'none'}}>
                        <input type="file" name='myImage' ref={imageRef } onChange={onImageChange}/>
                    </div>
                </div>
{image &&  (
    <div className="previewImage">
        <UilTimes onClick={()=>{setImage(null)}}/>      
        <img src={image.image} alt="" />
    </div>
  
)}
            </div>
        </div>
    )
}

export default PostShare