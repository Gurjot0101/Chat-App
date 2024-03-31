import React, { useEffect, useState, useCallback } from "react";
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
  const [{ user, selectedChatroom }, dispatch] = useStateValue();
  const [login, setLogin] = useState(true);

  const [prevmsg, setPM] = useState([]); //Previous msg []
  const [prevcr, setPC] = useState([]); //Previous chatroom []

  //when message pusher is called
  const setMessages = useCallback(
    (newMessage) => {
      const newCA = [...prevcr];
      const sortedCA = newCA.sort((a, b) => b.recentmsg - a.recentmsg);
      dispatch({
        type: actionTypes.SET_MESSAGES,
        messages: [...prevmsg, newMessage],
      });
      dispatch({
        type: actionTypes.SET_CHATROOMS,
        chatrooms: [...sortedCA],
      });
      setPC([...sortedCA]);
      setPM([...prevmsg, newMessage]);
    },
    [dispatch, prevmsg, prevcr]
  );

  const setChatrooms = useCallback(
    (newChatroom) => {
      const newCA = [newChatroom, ...prevcr];
      const sortedCA = newCA.sort((a, b) => b.recentmsg - a.recentmsg);
      dispatch({
        type: actionTypes.SET_CHATROOMS,
        chatrooms: sortedCA,
      });
      setPC(sortedCA);
    },
    [dispatch, prevcr]
  );

  //LOGIN
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

  //Seeding arrays
  useEffect(() => {
    instance.get("/api/v1/messages/sync").then((response) => {
      setPM(response.data);
      dispatch({
        type: actionTypes.SET_MESSAGES,
        messages: response.data,
      });
    });
    instance.get("/api/v1/chatrooms/sync").then((response) => {
      setPC(response.data);
      dispatch({
        type: actionTypes.SET_CHATROOMS,
        chatrooms: response.data,
      });
    });
  }, [dispatch]);

  // Triggering pusher
  useEffect(() => {
    var pusher = new Pusher("9a5aa5234d0a14d2e800", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("message");
    channel.bind("inserted", (newMessage) => {
      setMessages(newMessage);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [setMessages]);

  useEffect(() => {
    const pusher = new Pusher("9a5aa5234d0a14d2e800", {
      cluster: "ap2",
    });
    const channel = pusher.subscribe("chatrooms");
    channel.bind("inserted", (newChatroom) => {
      setChatrooms(newChatroom);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [setChatrooms]);

  return (
    <div className="app">
      {!login ? (
        <Login />
      ) : (
        <div className="app_body">
          <Leftbar />
          <Sidebar />
          {selectedChatroom ? <Chat /> : <DefaultScreen />}
        </div>
      )}
    </div>
  );
}

export default App;
