// importing
import express from "express";
import mongoose from "mongoose";
import Pusher from "pusher";
import cors from "cors";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import messageRoutes from "./routes/messages.js";
import chatroomRouter from "./routes/chatrooms.js";
import 'dotenv/config'

// app config
const app = express();
const port = process.env.PORT || 9000;

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "ChatRoom API",
      description: "ChatRoom Endpoints",
      contact: {
        name: "Vivek",
      },
      servers: [
        "http://localhost:4000",
        "https://chatcord-bfbi.onrender.com/api-doc",
      ],
      version: "1.0.0",
    },
  },
  apis: ["./src/routes/*.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const pusher = new Pusher({
  appId: "1758324",
  key: "1e733c5fc9794a0d6b9f",
  secret: "5f9a150864d55ce0957c",
  cluster: "ap2",
  useTLS: true
});


// middleware
app.use(express.json());

app.use(cors());

app.use("/api-doc", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
app.use(messageRoutes);
app.use(chatroomRouter);
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origins", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

// DB config
const connection_url = process.env.MONGO_URL ;// || "mongodb://127.0.0.1/whatschat";

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
