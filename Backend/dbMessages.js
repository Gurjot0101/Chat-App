import mongoose from "mongoose";

const whatsappSchema = mongoose.Schema({
  message: String,
  name: String,
  timestamp: String,
  uid: String,
});

// Collection
export default mongoose.model("messagecontents", whatsappSchema);
