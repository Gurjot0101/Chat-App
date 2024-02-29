import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import instance from "../axios";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function SidebarChat({ chatroom, addNewChat }) {
  const [seed, setSeed] = useState("");
  const [{ selectedChatroom }, dispatch] = useStateValue();

  const lastMessage = {
    message: "This is last message",
    timestamp: "This is time stamp",
  };
  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const handleChatroomChange = () => {
    dispatch({
      type: actionTypes.SET_CHATROOM,
      selectedChatroom: chatroom,
    });
  };

  const createChat = async () => {
    const roomName = prompt("Please enter name for chatroom");

    if (roomName) {
      await instance.post("/api/v1/chatrooms/new", {
        name: roomName,
      });
    }
  };
  return !addNewChat ? (
    <div
      className={`sidebarChat ${
        selectedChatroom &&
        chatroom?._id === selectedChatroom?._id &&
        "sidebarChat__selected"
      }`}
      onClick={handleChatroomChange}
    >
      <div className="sidebarChat__head">
        <div>
          <AccountCircleIcon />
        </div>
        <div className="sidebarChat__info">
          <h2>{chatroom?.name.toUpperCase()}</h2>
        </div>
      </div>
      <div className="sidebarChat__tail"></div>
    </div>
  ) : (
    <div></div>
  );
}

export default SidebarChat;
