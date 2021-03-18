import "./index.css";
import React from "react";
import ReactDOM from "react-dom";
import { io } from "socket.io-client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import SocketContext from "./contexts/Socket";

const mainSocket = io("http://localhost:3002/");
const xoSocket = io("http://localhost:3002/xo");

ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={{ mainSocket, xoSocket }}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
