import axios from "axios";

const instance = axios.create({
  baseURL: "https://whatschat-mern.herokuapp.com/",
});

export default instance;
