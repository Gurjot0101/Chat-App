import React from "react";
import "./LeftBar.css";
import { Avatar } from "@material-ui/core";
import SettingsIcon from '@material-ui/icons/Settings';
import { useEffect, useState } from "react";


function Leftbar(){

    const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

    return(
        <div className="Bar-main">
            <div className="Dp"><Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /></div>
            <div className="Setting"><SettingsIcon /></div>
        </div>
    )
}

export default Leftbar;