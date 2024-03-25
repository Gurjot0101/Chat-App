import React, { useEffect, useState } from "react";
import "./App.css";
import Chat from "./Chat/Chat";
import Sidebar from "./UI/Sidebar";
import Leftbar from "./UI/LeftBar";
import Pusher from "pusher-js";
import instance from "./axios";
import Login from "./LoginScreen/Login";
import { auth } from "./Auth/firebase";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import DefaultScreen from "./Default screen/DefaultScreen";

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
    instance.get("/api/v1/messages/sync").then((response) => {
      setMessages(response.data);
    });
    instance.get("/api/v1/chatrooms/sync").then((response) => {
      setChatrooms(response.data);
    });
  }, []);

  useEffect(() => {
    var pusher = new Pusher("9a5aa5234d0a14d2e800", {
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
    const pusher = new Pusher("9a5aa5234d0a14d2e800", {
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
