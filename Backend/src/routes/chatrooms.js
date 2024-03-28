import { Router } from "express";
import ChatRooms from "../models/dbChatrooms.js";

const chatroomRouter = Router();

chatroomRouter.get("/api/v1/chatrooms/sync", (req, res) => {
  ChatRooms.find().sort({ recentmsg: -1 })((err, data) => {
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

export default chatroomRouter;
