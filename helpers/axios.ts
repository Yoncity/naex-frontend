import axios from "axios";

const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
  //   validateStatus: status => {
  //     return status;
  //   },
});

export default server;
