import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./popup.css";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import AddCommentIcon from "@mui/icons-material/AddComment";
import instance from "../axios";

function PopB() {
  const [roomName, setRoomName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const createChat = async (name) => {
    const roomName = name;
    if (roomName) {
      await instance.post("/api/v1/chatrooms/new", {
        name: roomName,
        recentmsg: parseInt(recentMSG(new Date())) 
      });
      console.log("Creating chat with room name:", name);
    }
    setRoomName("");
  };

  function recentMSG(date){
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let sec = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const ampm = hours >= 12 ? 1 : 0;
    hours = hours % 12;
    hours = hours ? hours : 12;

    minutes = minutes.toString().padStart(2, "0");

    return `${year}${month}${day}${ampm}${hours}${minutes}${sec}`;
  }

  return (
    <div className="popupbtn">
      <Popup
        onOpen={() => {
          setIsOpen(true);
        }}
        onClose={() => {
          createChat(roomName);
          setIsOpen(false);
        }}
        trigger={
          <button className="add-button">
            {isOpen ? (
              roomName ? (
                <AddCommentIcon />
              ) : (
                <CloseIcon />
              )
            ) : (
              <AddIcon />
            )}
          </button>
        }
        position="left center"
        hoverable
      >
        <div className="popup-content">
          <input
            type="text"
            placeholder="Enter room name"
            value={roomName}
            maxLength="12"
            onChange={(e) => setRoomName(e.target.value)}
          />
        </div>
      </Popup>
    </div>
  );
}
export default PopB;
