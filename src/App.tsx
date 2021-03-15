import "./App.css";
import React, { useEffect, useState } from "react";
import useSocket from "./hooks/useSocket";

const App = () => {
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState<Array<string>>([]);
  const socket = useSocket();

  useEffect(() => {
    socket?.on("chat message", (msg) => {
      setMessages((oldMessages) => oldMessages.concat(msg));
      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      socket?.disconnect();
    };
  }, [socket]);

  return (
    <div className="App">
      <ul id="messages">
        {messages.map((message, idx) => (
          <li key={idx}>{message}</li>
        ))}
      </ul>
      <div id="form">
        <input
          id="input"
          autoComplete="off"
          value={messageValue}
          onChange={(e) => setMessageValue(e.target.value)}
        />
        <button
          onClick={() => {
            if (messageValue.length > 0) {
              socket?.emit("chat message", messageValue);
              setMessageValue("");
            }
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default App;
