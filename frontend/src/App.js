import React, { useEffect, useState } from "react";
import "./App.css";
import "./Login.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Leftbar from "./LeftBar";
import Pusher from "pusher-js";
import axios from "./axios";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import { auth } from "./firebase";
import { actionTypes } from "./reducer";
import DefaultScreen from "./DefaultScreen";

function App() {
  const [messages, setMessages] = useState([]);
  const [chatrooms, setChatrooms] = useState([]);
  const [{ user, selectedChatroom }, dispatch] = useStateValue();
  const [login, setLogin] = useState(true);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      let isMounted = true;
      if (user && isMounted) {
        dispatch({
          type: actionTypes.SET_USER,
          user: user,
        });
        setLogin(true);
        console.log("User Logged In");
      } else {
        dispatch({});
        console.log("User Logged out");
        setLogin(false);
      }
      console.log("auth change");
    });
  }, [user, dispatch, setLogin]);

  useEffect(() => {
    axios.get("/api/v1/messages/sync").then((response) => {
      setMessages(response.data);
    });
    axios.get("/api/v1/chatrooms/sync").then((response) => {
      setChatrooms(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("fe77b05322ba96a15311", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("message");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  useEffect(() => {
    const pusher = new Pusher("fe77b05322ba96a15311", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("chatrooms");
    channel.bind("inserted", (newChatroom) => {
      setChatrooms([...chatrooms, newChatroom]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [chatrooms]);

  return (
    <div className="app">
      {!login ? (
        <Login />
      ) : (
        <div className="app_body">
          <Leftbar />
          <Sidebar chatrooms={chatrooms} />
          {selectedChatroom ? <Chat messages={messages} /> : <DefaultScreen />}
        </div>
      )}
    </div>
  );
}

export default App;
