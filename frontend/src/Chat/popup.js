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
    const roomName = name.toUpperCase();
    const time = new Date();
    if (roomName) {
      await instance.post("/api/v1/chatrooms/new", {
        name: roomName,
        recentmsg: time.getTime(),
      });
      console.log("Creating chat with room name:", name);
    }
    setRoomName("");
  };

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
