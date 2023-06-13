import React, { useEffect, useState } from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ groupId, socket, user }) => {
  const [joinTime, setJoinTime] = useState(null);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [content, setContent] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    groupId: groupId,
    senderId: localStorage.getItem("uid"),
    content: String,
    timestamp: Number,
    senderPic: user.photoURL
  });

  const sendMessageToServer = (groupId, senderId, content, timestamp) => {
    socket.emit("send-message", message);
    setContent("");
  };

  useEffect(() => {
    // Assuming you have a socket instance set up and connected on the frontend
    // Listen for the "message-received" event from the server
    socket.on("message-received" + groupId, data => {
      if (data.status === "success") {
        if (user.joinTime) {
          const filtered = data.messages.filter((message) => Date.parse(message.timestamp) > user.joinTime);
          setMessages(filtered);
          console.log(filtered,user.joinTime);
        }
        // Handle success
        // setMessages(data.messages);
        const chatContainer = document.querySelector(".chat-messages");
        setTimeout(() => {
          chatContainer.scrollTop = chatContainer.scrollHeight;
        }, 0);
        // messages.push(data.savedMessage)
      } else if (data.status === "error") {
        // Handle error
        console.error(data.message);
      }
    });
  }, []);
  const isSent = true;

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message, index) =>
          <div
            key={index}
            className={`chat-message ${message.senderId ===
            localStorage.getItem("uid")
              ? "sent"
              : "received"}`}
          >
            {message.senderId !== localStorage.getItem("uid") &&
              <img
                className="profile-picture-chet"
                src={message.senderPic}
                alt="Profile"
              />}
            <div className="message-content">
              <p className="message-text">
                {message.content}
              </p>
              <span className="message-time">
                {new Date(message.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </div>
        )}

        {/* Add more message examples */}
      </div>
      <div className="chat-input">
        <input
          onKeyPress={e => {
            if (e.code === "Enter" && content !== "") {
              message.timestamp = Date.now();
              sendMessageToServer();
            }
          }}
          value={content}
          type="text"
          placeholder="Type your message..."
          onChange={e => {
            setContent(e.target.value);
            let a = message;
            a.content = e.target.value;
            setMessage(a);
          }}
        />
        <button
          onClick={e => {
            if (content !== "") {
              message.timestamp = Date.now();
              sendMessageToServer();
            }
          }}
          className="send-button"
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};

export default Chat;
