import React, { useState } from "react";
import "./AdminLayout.css";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Badge } from "antd";
import logOut from '../../img/logOut.png'
function AdminLayout({ children }) {
  const [collapsed, setcollapsed] = useState(false);
  const [admin, setadmin] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const Dispatch = useDispatch();

  const adminMenu = [
    {
      name: "Home",
      path: "/adminHome",
      icon: "ri-home-5-line",
    },
    {
      name: "users",
      path: "/userList",
      icon: "ri-user-line",
    },
  ];

  const logOutt=()=>{
    console.log("log")
    navigate("/admin")
  }

  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={collapsed ? "collapsed-sidebar" : "sidebar"}>
          <div className="sidebar-header">
            <h1 className="logo"></h1>
          </div>
          <div className="menu">
            {adminMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                  navigate("/admin");
                  localStorage.removeItem("adminToken");
              }}
            >
              <i className="ri-logout-circle-line"></i>
              {!collapsed && <Link to="/admin">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-line close-icons"
                onClick={() => {
                  setcollapsed(false);
                }}
              ></i>
            ) : (
              <i
                className="ri-close-line close-icons"
                onClick={() => {
                  setcollapsed(true);
                }}
              ></i>
            )}
                     <div className="d-flex align-items-center px-3">
              {/* <Badge className="mx-3" size="default" count={user?.unseenNotifications.length} onClick={()=>navigate('/notifications')}>
                <i className="ri-notification-line header-action-icon"></i>
              </Badge> */}
              
            
              {/* <LogoutIcon onClick={logOutt}/> */}
              <img src={logOut} style={{width:"1.5rem" ,height:"1.5rem"}} onClick={logOutt} alt="" />
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
