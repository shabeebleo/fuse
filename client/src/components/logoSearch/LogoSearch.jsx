import React from 'react'
import Logo from '../../img/logo.png'
import {UilSearch} from '@iconscout/react-unicons'
import { useNavigate } from 'react-router-dom'
import './LogoSearch.css'
function LogoSearch() {
  const navigate=useNavigate()
  return (
   <div className="LogoSearch">
  <img onClick={()=>{navigate("/home")}}  src={Logo} style={{width:'4rem', height:'4rem',marginTop:'-.5rem',}} alt="" />
  <div className="Search">
    <input type="text" placeholder='#Explore' />
    <div className="s-icon">
        <UilSearch/>
    </div>
  </div>
   </div>
  )
}

export default LogoSearch