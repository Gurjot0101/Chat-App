import mongoose from "mongoose";

const messagesSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  uid: String,
  chatroomId: String,
});

// Collection

const Messages = mongoose.model("messages", messagesSchema);
export default Messages;
