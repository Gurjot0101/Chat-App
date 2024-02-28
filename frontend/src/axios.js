import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000"
  //"https://chat-app-r25h.onrender.com",
});

export default instance;
