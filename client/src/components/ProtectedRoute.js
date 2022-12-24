import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import axios from "axios";
import { useEffect } from "react";
import { setUser } from "../redux/userSlice";

function ProtectedRoute(props) {
const dispatch=useDispatch()
    // const { userData } = useSelector((state) => 
    // state.user);
    const getData = async () => {
        try {

          const response = await axios.get('/user',{
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token")
            },
          });
          dispatch(setUser(response.data))
         
        
        } catch (error) {
          console.log(error);
        }
       
      }
      useEffect(() => {
        getData()
    
    }, [])
    if(localStorage.getItem("token")){
return props.children
    }else{
return <Navigate to ="/"/>
    }
  
}

export default ProtectedRoute