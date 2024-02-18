import { Router } from "express";
import ChatRooms from "../models/dbChatrooms.js";

const chatroomRouter = Router();

/**
 * @swagger
 * /api/v1/chatrooms/sync:
 *  get:
 *    tags:
 *      - ChatRoom Api
 *    description: Used to get all Chatrooms from database
 *    responses:
 *      '200':
 *        description: all the chatroom successfully fetched from database and sent to client
 *        content:
 *          'application/json':
 *            schema:
 *              type: object
 *      '500':
 *        description: Server Error
 *        content:
 *          'application/json':
 *            schema:
 *              type: object
 */

chatroomRouter.get("/api/v1/chatrooms/sync", (req, res) => {
  ChatRooms.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

/**
 * @swagger
 * /api/v1/chatrooms/new:
 *  post:
 *    tags:
 *      - ChatRoom Api
 *    description: Route to create new chatrooms and store in database.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: chatroom
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              example: Study Room
 *    responses:
 *      '201':
 *        description: Chatroom created in database successfully
 *      '500':
 *        description: Server Error
 */

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
