import { Router } from "express";
import ChatRooms from "../models/dbChatrooms.js";

const chatroomRouter = Router();

chatroomRouter.get("/api/v1/chatrooms/sync", (req, res) => {
  ChatRooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

chatroomRouter.post("/api/v1/chatrooms/new", (req, res) => {
  const chatroom = req.body;

  ChatRooms.create(chatroom, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new chatroom created: \n ${data}`);
    }
  });
});

chatroomRouter.patch("/api/v1/chatrooms/:roomName", (req, res) => {
  const roomName = req.params.roomName;
  console.log(roomName, ' = ', roomName.recentmsg);
  const recentmsg = req.body.recentmsg;
  ChatRooms.findOneAndUpdate(
    { name: roomName },
    { recentmsg: recentmsg },
    (err, doc) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(doc);
      }
    }
  );
  console.log(`recentmsg changed for ${roomName}`);
});

export default chatroomRouter;
