import axios from "axios";

const instance = axios.create({
  baseURL: "https://chat-app-r25h.onrender.com",
});

export default instance;
