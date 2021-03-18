import React from "react";
import { Socket } from "socket.io-client";

type KnownSockets = {
  mainSocket: Socket;
  xoSocket: Socket;
};

const SocketContext = React.createContext<KnownSockets | null>(null);

export default SocketContext;
