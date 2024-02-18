// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

// app config
const app = express();
const port = process.env.PORT || 3000;

const pusher = new Pusher({
  appId: "1414254",
  key: "d70b311cec9d09ede019",
  secret: "ec421c281739c25bf7d2",
  cluster: "ap2",
  useTLS: true,
});

// middleware
app.use(express.json());

app.use(cors());


// DB config
const connection_url = process.env.connection_url;

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
  console.log("Connecting DB");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occurred", change);

    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        uid: messageDetails.uid,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// ????

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/api/v1/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/api/v1/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
