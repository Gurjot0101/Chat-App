import React from "react";
import "./LeftBar.css";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import { useStateValue } from "./StateProvider";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Leftbar(){
  const [{ user, selectedChatroom }, dispatch] = useStateValue();

    
  
    return(
        <div className="Bar-main">
          <div className="User">
              <div className="UserDp"><AccountCircleIcon/> </div>
              <div className="UserName">{user?.displayName}</div>
          </div> 
          <div className="Setting"><SettingsIcon /></div>
        </div>
    )
}

export default Leftbar;