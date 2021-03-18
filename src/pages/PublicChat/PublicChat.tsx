import "./PublicChat.css";
import React, { useEffect, useState } from "react";
import useSockets from "../../hooks/useSockets";

const PublicChat = () => {
  const [messageValue, setMessageValue] = useState("");
  const [messages, setMessages] = useState<Array<string>>([]);
  const sockets = useSockets();

  const socket = sockets?.mainSocket;

  useEffect(() => {
    socket?.on("chat message", (msg) => {
      setMessages((oldMessages) => oldMessages.concat(msg));
      window.scrollTo(0, document.body.scrollHeight);
    });

    return () => {
      socket?.off("chat message");
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

export default PublicChat;
