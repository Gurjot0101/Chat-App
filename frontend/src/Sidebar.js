import React, { useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { SearchOutlined, Add } from "@material-ui/icons";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import axios from "./axios";

function Sidebar({ chatrooms }) {
  const [{ user }, dispatch] = useStateValue();
  const [filter, setFilter] = useState("");
  const createChat = async () => {
    const roomName = prompt("Please enter name for chatroom");

    if (roomName) {
      await axios.post("/api/v1/chatrooms/new", {
        name: roomName,
      });
    }
  };
  return (
    <div className="sidebar">
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search for a chat"
            type="text"
          />
        </div>
        <div className="collection">
          <div className="collection__number">14</div>
          <img
            height={17}
            src="https://cdn.iconscout.com/icon/free/png-256/save-3244517-2701888.png"
          ></img>
        </div>
      </div>
      <div className="sorting__bar">
        <div>Sort By: Default</div>
        <div className="add__contact">
          <div className="add__contact__text">Add New</div>
          <div className="add__contact__button" onClick={() => createChat()}>
            <Add />
          </div>
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat={true} />
        {chatrooms
          ?.filter((chatroom) =>
            chatroom?.name?.toLowerCase()?.includes(filter?.toLowerCase())
          )
          ?.map((chatroom, index) => (
            <SidebarChat key={index} chatroom={chatroom} />
          ))}
      </div>
    </div>
  );
}

export default Sidebar;
