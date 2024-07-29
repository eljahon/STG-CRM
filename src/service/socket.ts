import { io, Socket } from "socket.io-client";

const URL = "https://devapi.growz.uz"; // replace with your server URL

const getSocket = (): Socket => {
  const token = window.localStorage.getItem("authToken");

  return io(URL + "?token=" + token);
};

export default getSocket;
