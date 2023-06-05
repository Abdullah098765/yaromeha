import React, { useContext, useEffect, useState } from "react";
import "./room.css";
import Chat from "./room-components/chat";
import ParticipantsList from "./ParticipantsList";
import RoomControls from "./room-control.js";
import { AppContext } from "../Context/context";
import { io } from "socket.io-client";
const url = window.location.href
const strs = url.split('=')
const groupId = strs.at(-1)


const Sharing = ({ content }) => {
  let {   participantImage,
    setParticipantImage} = useContext(AppContext);
  
  return (
    <div className="sharing">
      {true && (
        <>
          {true && (
            <img className="content-image" src={participantImage} />
          )}
          {false && (
            <video className="content-video" src={'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'} autoPlay muted loop></video>
          )}
        </>
      )}
    </div>
  );
};

async function addMember(params) {
  try {
    const response = await fetch("https://yaromeha-server-production.up.railway.app/add_member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ groupId, userId: localStorage.getItem("uid") }),
    });

    const data = await response.json();

    if (data.message === "User is already a member of the group") {
      // User is already a member, handle accordingly
      console.log("User is already a member of the group");
    } else if (data.message === "User has been added as a member of the group") {
      // User has been added as a member, handle accordingly
      console.log("User has been added as a member of the group");
    } else {
      // Handle any other response or error cases
      console.log("Unexpected response:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}


const Room = () => {


  const [groupData, setGroupData] = useState({})

 
  

  useEffect(()=>{
  addMember()

  const fetchGroupData = async () => {
    try {
      const response = await fetch(`https://yaromeha-server-production.up.railway.app/get_group?groupId=${groupId}`);
      const data = await response.json();
      setGroupData(data.group);
      console.log(groupData.members);
    } catch (error) {
      console.error('Error fetching group data:', error);
    }
  };


fetchGroupData();

    const socket = io('https://yaromeha-server-production.up.railway.app',{
      query: { groupId, memberId: localStorage.getItem('uid') }
    });


socket.on(groupId,(e)=>{
  console.log(e);
  fetchGroupData()
})


  },[])

  
  return (
    <div>
      <div className="room-container">
        <Chat />
        {/* <div className="chat-container"> */}

        {/* <div className="participants">
          <ParticipantsList />
        </div> */}
        {/* </div> */}
        {/* <div className="room-controls">
        <RoomControls />
      </div> */}
     <div className="room0">
     <div className="roomControls-ParticipantsList">
          <RoomControls />
          <Sharing/>
         
            <ParticipantsList members={groupData.members} />


        </div>
     </div>
      </div>
    </div>
  );
};

export default Room;
