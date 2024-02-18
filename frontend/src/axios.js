import axios from "axios";

const instance = axios.create({
  baseURL: "https://chatcord-bfbi.onrender.com",
});

export default instance;
