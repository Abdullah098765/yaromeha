import React from 'react';
import './room-control.css';

const RoomControls = () => {
  return (
    <div className="room-controls">
      <button className="control-btn">
        <i className="fas fa-video"></i>
        <span>Video On/Off</span>
      </button>
      <button className="control-btn">
        <i className="fas fa-microphone"></i>
        <span>Audio On/Off</span>
      </button>
      <button className="control-btn">
        <i className="fas fa-desktop"></i>
        <span>Screen Sharing</span>
      </button>
      <button className="control-btn">
        <i className="fas fa-phone-slash"></i>
        <span>End Call</span>
      </button>
      <button className="control-btn">
        <i className="fas fa-users"></i>
        <span>Participants List</span>
      </button>
      <button className="control-btn">
        <i className="fas fa-volume-mute"></i>
        <span>Mute All</span>
      </button>
      <button className={` ${true ? "control-btn" : "selected-control-btn"}`}>
        <i className="fas fa-comments"></i>
        <span>Chat</span>
      </button>
      <button className="control-btn">
        <i className="fas fa-video-slash"></i>
        <span>Recording</span>
      </button>
      <button className="control-btn">
        <i className="fas fa-cog"></i>
        <span>Settings</span>
      </button>
    </div>
  );
};

export default RoomControls;
