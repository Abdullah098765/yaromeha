import React, { useContext, useState } from 'react';
import { AppContext } from "../Context/context";

import './room-control.css';
import Peer from 'peerjs';
import { Socket } from 'socket.io-client';

const RoomControls = ({ streamSocket, handleMicToggle }) => {


  let { myPeer, setMyPeer, audioActive, setAudioActive, stream, setStream, } = useContext(AppContext);



  return (
    <abbr title="More options will be enabled when our application reaches one million traffic">

    <div className="room-controls">
        <button className="control-btn" onClick={() => {
          handleMicToggle()
        }}>
          <i className={`fas ${audioActive ? 'fa-microphone' : 'fa-microphone-slash'}`}></i>
          <span>{audioActive ? 'Mic On' : 'Mice Off'}</span>
        </button>

        <button className="control-btn" title="More options will be enabled when our application reaches one million traffic">
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
    </abbr>

  );
};

export default RoomControls;
