import mongoose from "mongoose";

const chatroomsSchema = mongoose.Schema({
  name: String,
});

// Collection
const ChatRooms = mongoose.model("chatrooms", chatroomsSchema);
export default ChatRooms;
