import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import instance from "../axios";
import { useStateValue } from "../StateProvider";
import { auth } from "../Auth/firebase";
import Picker from "emoji-picker-react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AttachmentIcon from '@mui/icons-material/Attachment';

import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

function Chat({ messages }) {
  const [input, setInput] = useState("");
  const [isShowEmojiPicker, setIsShowEmojiPicker] = useState(false);
  const [{ user, selectedChatroom }, dispatch] = useStateValue();
  const [seed, setSeed] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };
  const onEmojiClick = (event, emojiObject) => {
    setInput(input + emojiObject.emoji);
  };

  const toggleEmojiPicker = () => {
    setIsShowEmojiPicker(!isShowEmojiPicker);
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [selectedChatroom]);
  const lastSeen = "today";

  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.length === 0) {
      return;
    }
    await instance.post("/api/v1/messages/new", {
      message: input,
      name: user?.displayName,
      timestamp: new Date().toUTCString(),
      uid: user?.uid,
      chatroomId: selectedChatroom?._id,
    });
    setInput("");
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
          <ManageSearchIcon/>          
        </div>
      </div>

      <div className="chat__body">
        {console.log(messages)}
        {messages.map((message, index) => (
          <p
            key={index}
            className={`chat__message ${
              user?.uid === message.uid && "chat__receiver"
            } ${message.chatroomId !== selectedChatroom?._id && "chat__hide"}`}
          >
            <div className="chat__name">{message.name}</div>
            <div className="chat__msg">{message.message}</div>
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {isShowEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}
      <div className="chat__footer">
        {isShowEmojiPicker ? (
          <span onClick={toggleEmojiPicker}>
            <InsertEmoticonIcon/>
          </span>
        ) : (
          <span onClick={toggleEmojiPicker}>
            <EmojiEmotionsIcon/>
          </span>
        )}
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            
          </button>
        </form>
          <AttachmentIcon/>
          <MicIcon/>
        <span onClick={sendMessage}>
        <SendIcon/>
        </span>
      </div>
    </div>
  );
}

export default Chat;
