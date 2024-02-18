import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  SearchOutlined,
  ExitToApp,
  Close,
  Send,
} from "@material-ui/icons";
//import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import React, { useEffect, useState, useRef } from "react";
import "./Chat.css";
import axios from "./axios";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import Picker from "emoji-picker-react";

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

  const logout = () => {
    try {
      auth.signOut();
    } catch (e) {
      console.log(e);
    }
  };
  const sendMessage = async (e) => {
    e.preventDefault();

    if (input.length === 0) {
      return;
    }
    await axios.post("/api/v1/messages/new", {
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
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat__headerInfo">
          <h3>{selectedChatroom?.name}</h3>
          <p>Last Seen at {lastSeen}</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton onClick={() => logout()}>
            <ExitToApp />
          </IconButton>
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
          <IconButton onClick={toggleEmojiPicker}>
            <Close />
          </IconButton>
        ) : (
          <IconButton onClick={toggleEmojiPicker}>
            <InsertEmoticon />
          </IconButton>
        )}
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
        <IconButton onClick={sendMessage}>
          <Send />
        </IconButton>
      </div>
    </div>
  );
}

export default Chat;
