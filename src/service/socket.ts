import { io, Socket } from "socket.io-client";

const URL = "https://devapi.growz.uz"; // replace with your server URL
let socket: Socket;

const getSocket = (): Socket => {
  const token = window.localStorage.getItem("authToken");

  if (!socket) {
    socket = io(URL + "?token=" + token, {
      autoConnect: false,
      auth: {
        token
      }
    });
  } else {
    socket.auth = { token };
  }
  return socket;
};

export default getSocket;
