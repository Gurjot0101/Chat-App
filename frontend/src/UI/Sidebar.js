import React, { useState } from "react";
import "./Sidebar.css";
import SidebarChat from "../Chat/SidebarChat";
import { useStateValue } from "../StateProvider";
import PopB from "../Chat/popup";
import SearchIcon from "@mui/icons-material/Search";
import SortMenu from "./SortMenu";

function Sidebar({ chatrooms }) {
  const [{ user }, dispatch] = useStateValue();
  const [filter, setFilter] = useState("");

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
      <div className="sorting__bar">
        <div>
          <SortMenu />
        </div>
      </div>

      <div className="sidebar__chats">
        <SidebarChat addNewChat={true} />
        
        {chatrooms
          ?.sort((a, b) => b.recentmsg - a.recentmsg)
          ?.map((chatroom) => (
            <SidebarChat chatroom={chatroom} />
          ))
        }

        <PopB />
      </div>
    </div>
  );
}

export default Sidebar;
