import React from "react";
import "./LeftBar.css";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


function Leftbar(){

    const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

    return(
        <div className="Bar-main">
          <div className="User">
              <div className="UserDp"><AccountCircleIcon/> </div>
              <div className="UserName">{auth.currentUser.displayName}</div>
          </div> 
          <div className="Setting"><SettingsIcon /></div>
        </div>
    )
}

export default Leftbar;