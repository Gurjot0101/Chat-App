// importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import messageRoutes from "./routes/messages.js";
import chatroomRouter from "./routes/chatrooms.js";
import 'dotenv/config'

// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1758323",
  key: "9a5aa5234d0a14d2e800",
  secret: "d0d4d63513a0d53a9721",
  cluster: "ap2",
  useTLS: true
});

// middleware
app.use(express.json());
app.use(cors());

app.use(messageRoutes);
app.use(chatroomRouter);

// DB config
const connection_url = process.env.MONGO_URL;

mongoose
  .connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connection successful"))
  .catch((e) => console.log("failed", e))
  .finally(() => console.log("DB Running"));

const db = mongoose.connection;

db.once("open", () => {
  console.log("Connecting to DB");

  const msgCollection = db.collection("messages");
  const chatroomCollection = db.collection("chatrooms");

  const msgStream = msgCollection.watch();
  const chatroomStream = chatroomCollection.watch();

  msgStream.on("change", (change) => {
    console.log("A change occurred in messages", change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("message", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        uid: messageDetails.uid,
        chatroomId: messageDetails.chatroomId,
      });
    } else {
      console.log("Error triggering Pusher in messages");
    }
  });

  chatroomStream.on("change", (change) => {
    console.log("A change occurred in chatrooms", change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("chatrooms", "inserted", {
        name: messageDetails.name,
      });
    } else {
      console.log("Error triggering Pusher in chatrooms");
    }
  });
});

// api routes
app.get("/", (req, res) => res.status(200).send("Welcome to WhatsChat"));

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
