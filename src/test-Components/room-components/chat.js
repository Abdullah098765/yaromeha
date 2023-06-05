import React from "react";
import "./chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = () => {
    const isSent = true
  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className={`chat-message ${!isSent ? "sent" : "received"}`}>
          {isSent &&
            <img
              className="profile-picture"
              src={'https://cdn.dribbble.com/users/448097/screenshots/10852088/paper-plane-logo_4x.jpg'}
              alt="Profile"
            />}
          <div className="message-content">
            <p className="message-text">
              Hi Abdullah
            </p>
            <span className="message-time">{'3:34 PM'}</span>

          </div>
        </div>
       
        <div className={`chat-message ${isSent ? "sent" : "received"}`}>
          {!isSent &&
            <img
              className="profile-picture"
              src={'https://cdn.dribbble.com/users/448097/screenshots/10852088/paper-plane-logo_4x.jpg'}
              alt="Profile"
            />}
          <div className="message-content">
            <p className="message-text">
              I am Happy
            </p>
            <span className="message-time">{'3:34 PM'}</span>

          </div>
        </div>

        <div className={`chat-message ${!isSent ? "sent" : "received"}`}>
          {isSent &&
            <img
              className="profile-picture"
              src={'https://cdn.dribbble.com/users/448097/screenshots/10852088/paper-plane-logo_4x.jpg'}
              alt="Profile"
            />}
          <div className="message-content">
            <p className="message-text">
           What are you Doing right now?
            </p>
            <span className="message-time">{'3:34 PM'}</span>

          </div>
        </div>

        <div className={`chat-message ${isSent ? "sent" : "received"}`}>
          {!isSent &&
            <img
              className="profile-picture"
              src={'https://cdn.dribbble.com/users/448097/screenshots/10852088/paper-plane-logo_4x.jpg'}
              alt="Profile"
            />}
          <div className="message-content">
            <p className="message-text">
              I am Working on Yaromeha App, 
              What about you?
            </p>
            <span className="message-time">{'3:34 PM'}</span>

          </div>
        </div>

        <div className={`chat-message ${!isSent ? "sent" : "received"}`}>
          {isSent &&
            <img
              className="profile-picture"
              src={'https://cdn.dribbble.com/users/448097/screenshots/10852088/paper-plane-logo_4x.jpg'}
              alt="Profile"
            />}
          <div className="message-content">
            <p className="message-text">
           What are you Doing right now?
            </p>
            <span className="message-time">{'3:34 PM'}</span>

          </div>
        </div>
        <div className={`chat-message ${!isSent ? "sent" : "received"}`}>
          {isSent &&
            <img
              className="profile-picture"
              src={'https://cdn.dribbble.com/users/448097/screenshots/10852088/paper-plane-logo_4x.jpg'}
              alt="Profile"
            />}
          <div className="message-content">
            <p className="message-text">
           What are you Doing right now?
            </p>
            <span className="message-time">{'3:34 PM'}</span>

          </div>
        </div>
        <div className={`chat-message ${!isSent ? "sent" : "received"}`}>
          {isSent &&
            <img
              className="profile-picture"
              src={'https://cdn.dribbble.com/users/448097/screenshots/10852088/paper-plane-logo_4x.jpg'}
              alt="Profile"
            />}
          <div className="message-content">
            <p className="message-text">
           What are you Doing right now?
            </p>
            <span className="message-time">{'3:34 PM'}</span>

          </div>
        </div>
        <div className={`chat-message ${!isSent ? "sent" : "received"}`}>
          {isSent &&
            <img
              className="profile-picture"
              src={'https://cdn.dribbble.com/users/448097/screenshots/10852088/paper-plane-logo_4x.jpg'}
              alt="Profile"
            />}
          <div className="message-content">
            <p className="message-text">
           What are you Doing right now?
            </p>
            <span className="message-time">{'3:34 PM'}</span>

          </div>
        </div>

        {/* Add more message examples */}
      </div>
      <div className="chat-input">
        <input type="text" placeholder="Type your message..." />
        <button className="send-button">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </div>
  );
};



export default Chat;
