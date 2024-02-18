import { Router } from "express";
import Messages from "../models/dbMessages.js";

const messageRoutes = new Router();

/**
 * @swagger
 * /api/v1/messages/sync:
 *  get:
 *    tags:
 *      - Message Api
 *    description: Used to get all messages from database
 *    responses:
 *      '200':
 *        description: all the messages successfully fetched from database and sent to client
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

messageRoutes.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

/**
 * @swagger
 * /api/v1/messages/new:
 *  post:
 *    tags:
 *      - Message Api
 *    description: Route to create new messages and store in database.
 *    consumes:
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: dbMessage
 *        schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              example: vivek
 *            message:
 *              type: string
 *              example: hello everyone
 *            timestamp:
 *              type: string
 *              example: Fri, 24 Jun 2022 18:03:16 GMT
 *            uid:
 *              type: string
 *              example: kN2yobYc0cYN77EHBhu0aA32SN52
 *            chatroomId:
 *              type: string
 *              example: 62b2c0068bd12b8a1b1be649
 *    responses:
 *      '201':
 *        description: Message created in database successfully
 *      '500':
 *        description: Server Error
 */

messageRoutes.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

export default messageRoutes;
