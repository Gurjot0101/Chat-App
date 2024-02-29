import React, { useState } from "react";
import "./Sidebar.css";
import SidebarChat from "../Chat/SidebarChat";
import { useStateValue } from "../StateProvider";
import PopB from "../Chat/popup";
import SearchIcon from '@mui/icons-material/Search';

function Sidebar({ chatrooms }) {
  const [{ user }, dispatch] = useStateValue();
  const [filter, setFilter] = useState("");

  return (
    <div className="sidebar">
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon/>
          <input
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Search for a chat"
            type="text"
          />
        </div>
        
      </div>
      <div className="sorting__bar">
        <div>Sort By: Default</div>
      </div>
      
      <div className="sidebar__chats">
        <SidebarChat addNewChat={true} />
        <PopB />
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
