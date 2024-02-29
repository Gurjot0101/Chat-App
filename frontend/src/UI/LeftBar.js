import React from "react";
import "./LeftBar.css";
import { useEffect, useState } from "react";
import { auth } from "../Auth/firebase";
import { useStateValue } from "../StateProvider";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';


function Leftbar(){
  const [{ user, selectedChatroom }, dispatch] = useStateValue();

  const logout = () => {
    try {
      auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };
  
    return(
        <div className="Bar-main">
          <div className="User">
              <div className="UserDp"><AccountCircleIcon/> </div>
              <div className="UserName">{user?.displayName}</div>
          </div> 
          <div className="Icons">
            <div className="Setting"> 
              <SettingsIcon />
            </div>
            <div className="Setting"> 
              <LogoutIcon onClick={() => logout()}/>
            </div>
          </div>
        </div>
    )
}

export default Leftbar;