import React from "react";
import "./LeftBar.css";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Leftbar(){

    // <div className="UserName">{auth.currentUser.displayName}</div>
  
    return(
        <div className="Bar-main">
          <div className="User">
              <div className="UserDp"><AccountCircleIcon/> </div>
             
          </div> 
          <div className="Setting"><SettingsIcon /></div>
        </div>
    )
}

export default Leftbar;