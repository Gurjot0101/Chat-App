import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { useStateValue } from "../StateProvider";
import { actionTypes } from "../reducer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function SidebarChat({ chatroom, addNewChat }) {
  const [{ selectedChatroom }, dispatch] = useStateValue();

  const isAlreadySelected = selectedChatroom;

  const handleChatroomChange = () => {
    dispatch({
      type: actionTypes.SET_CHATROOM,
      selectedChatroom: isAlreadySelected ? null : chatroom,
    });
  };

  return !addNewChat ? (
    <div
      className={`sidebarChat ${
        selectedChatroom &&
        chatroom === selectedChatroom &&
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
