import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import instance from "../axios";
import { useStateValue } from "../StateProvider";
import Picker from "emoji-picker-react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AttachmentIcon from "@mui/icons-material/Attachment";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import MicIcon from "@mui/icons-material/Mic";
import SearchIcon from "@mui/icons-material/Search";

function Chat() {
  const [input, setInput] = useState("");
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
  const [{ user, selectedChatroom, messages }] = useStateValue();
  const [filter, setFilter] = useState("");

  //Scroll to end in chat component
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedChatroom]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  };

  //Date
  const now = new Date();
  const lastSeen = formatDate(now);

  function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes.toString().padStart(2, "0");
    return `${hours}:${minutes} ${ampm}, ${day} ${month}`;
  }
  // Date end

  // Emoji start
  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setIsShowEmojiPicker(!isShowEmojiPicker);
  };
  // Emoji end

  //When message is sent
  const sendMessage = async (e) => {
    e.preventDefault();
    const time = new Date();
    if (input.length === 0) {
      return;
    }
    await instance.post("/api/v1/messages/new", {
      message: input,
      name: user?.displayName,
      timestamp: lastSeen,
      uid: user?.uid,
      chatroomId: selectedChatroom?._id,
    });
    console.log("old recentmsg =", selectedChatroom.recentmsg);
    updateChatroom(selectedChatroom, time.getTime());
    setInput("");
    setIsShowEmojiPicker(false);
  };

  const updateChatroom = async (selectedChatroom, time) => {
    const roomName = selectedChatroom;
    if (roomName) {
      await instance.patch(`/api/v1/chatrooms/${roomName.name}`, {
        recentmsg: time,
      });
      console.log("recentmsg changed for", roomName.recentmsg, "TO", time);
    }
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <AccountCircleIcon />

        <div className="chat__headerInfo">
          <h3>{selectedChatroom?.name}</h3>
          <p>Last Seen at {lastSeen}</p>
        </div>

        <div className="chat__headerRight">
          <div className="chat__search">
            <div className="chat__searchContainer">
              <SearchIcon />
              <input
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                placeholder="Search for a Message"
                type="text"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="chat__body">
        {messages ? (
          messages
            ?.filter((message) =>
              message?.message?.toLowerCase()?.includes(filter?.toLowerCase())
            )
            ?.map((message, index) => (
              <div
                key={index}
                className={`chat__message 
              ${user?.uid === message.uid && "chat__receiver"} 
              ${message.chatroomId !== selectedChatroom?._id && "chat__hide"}`}
              >
                <div className="chat__name">
                  {user?.uid === message.uid ? "You" : message.name}
                </div>
                <div className="chat__msg">{message.message}</div>
                <span className="chat__timestamp">{message.timestamp}</span>
              </div>
            ))
        ) : (
          <div className="null__messages">null</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {isShowEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}

      <div className="chat__footer">
        {isShowEmojiPicker ? (
          <span onClick={toggleEmojiPicker}>
            <InsertEmoticonIcon />
          </span>
        ) : (
          <span onClick={toggleEmojiPicker}>
            <EmojiEmotionsIcon />
          </span>
        )}
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
        </form>
        <AttachmentIcon />
        <MicIcon />
        <SendIcon onClick={sendMessage} />
      </div>
    </div>
  );
}

export default Chat;
