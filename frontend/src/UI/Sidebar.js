import React, { useState } from "react";
import "./Sidebar.css";
import SidebarChat from "../Chat/SidebarChat";
import { useStateValue } from "../StateProvider";
import PopB from "../Chat/popup";
import SearchIcon from "@mui/icons-material/Search";

function Sidebar() {
  const [{ chatrooms }] = useStateValue();
  const [filter, setFilter] = useState("");

  const chatrlist = [...chatrooms];

  let index = 0;

  return (
    <div className="sidebar">
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search for a chat"
            type="text"
          />
        </div>
      </div>
      <div className="sidebar__chats">
        <SidebarChat addNewChat={true} />

        {chatrlist
          ?.filter((chatroom) =>
            chatroom?.name?.toLowerCase()?.includes(filter?.toLowerCase())
          )
          ?.map((chatroom) => (
            <SidebarChat key={index++} chatroom={chatroom} />
          ))}

        <PopB />
      </div>
      {/* <div className="sidebar__bottom">
        <div>chat</div>
        <div>group</div>
      </div> */}
    </div>
  );
}

export default Sidebar;
