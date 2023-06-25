import React, { useContext, useEffect, useRef, useState } from "react";
import "./room.css";
import Chat from "./room-components/chat";
import ParticipantsList from "./ParticipantsList";
import RoomControls from "./room-control.js";
import { AppContext } from "../Context/context";
import { io } from "socket.io-client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Sharing from "./sharing";
import Peer from "peerjs";
const peerConnection = new RTCPeerConnection();

const url = window.location.href
const strs = url.split('=')
const groupId = strs.at(-1)



async function addMember(setAuthStatus, setShowLoading) {
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
      setShowLoading(false)

    } else {
      // Handle any other response or error cases
      console.log("Unexpected response:", data);
      setAuthStatus(data)

    }
  } catch (error) {
    console.error("Error:", error);
  }
}


const Room = () => {


  const [groupData, setGroupData] = useState({})
  const [authStatus, setAuthStatus] = useState({})
  const [allCalls, setAllCalls] = useState([])
  const [showLoading, setShowLoading] = useState(true)
  const peerRef = useRef(null);






  let { setUser, user, openDropDown, setOpenDropDown, participantImage, stream, setStream, myPeer, setMyPeer, setParticipantImage, setHandleMicToggle, audioActive, setAudioActive } = useContext(AppContext);
  const socket = io('https://yaromeha-server-production.up.railway.app', {
    query: { groupId, memberId: localStorage.getItem('uid'), }
  });
  const streamSocket = io('http://localhost:3001', {
    query: { groupId, memberId: localStorage.getItem('uid'), myPeer }
  });

  useEffect(() => {


    addMember(setAuthStatus, setShowLoading)

    socket.on(localStorage.getItem('uid'), (e) => {
      setUser(e)
      setParticipantImage(e.photoURL)
    })

    const fetchGroupData = async () => {
      try {
        const response = await fetch(`https://yaromeha-server-production.up.railway.app/get_group?groupId=${groupId}`);
        const data = await response.json();
        setGroupData(data.group);
      } catch (error) {
        console.error('Error fetching group data:', error);
      }
    };


    fetchGroupData();




    socket.on(groupId, (e) => {
      fetchGroupData()
    })



  }, [])
  // Streaming








  function handleMicToggle() {

    try {
      if (audioActive) {
        // Microphone is currently on, turn it off
        setAudioActive(false);
        if (stream) {
          // Stop capturing audio
          stream.getTracks().forEach((track) => track.stop());
          setStream(null);
        }
        streamSocket.emit('remove-peerId', myPeer)
      }

      // else {


      //   // Microphone is currently off, request access to the microphone
      //   navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then((stream) => {
      //     setAudioActive(true);
      //     setStream(stream);
      //     // Start capturing audio


      //     peer.on('open', (peerId) => {
      //       console.log('Connected with peer ID:', peerId);

      //       streamSocket.emit('add-peerId', peerId)
      //       setMyPeer(peerId)

      //       // Call a remote peer and send the media stream

      //       allCalls.forEach((remotePeerId) => {
      //         const call = peer.call(remotePeerId, stream);
      //         console.log('calling');


      //       });

      //     });
      //   });



      //   // const call = peer.call('732c17dc-84af-4e55-95f6-98aa226a8d32', mediaStream);

      //   // // Handle the 'stream' event when the remote peer answers the call
      //   // call.on('stream', (remoteStream) => {
      //   //   // Display the remote media stream on the user's interface
      //   //   const remoteVideoElement = document.getElementById('remote-video');
      //   //   remoteVideoElement.srcObject = remoteStream;
      //   //   // ... (Append the audio element to the appropriate container in the UI)
      //   // });

      //   peer.on('call', (call) => {
      //     console.log('Calling from ', call);
      //     // Answer the call and send our media stream
      //     call.answer();

      //     // Handle the 'stream' event when the remote peer starts sending their stream
      //     call.on('stream', (remoteStream) => {
      //       // Display the remote media stream on a video element
      //       const remoteVideoElement = document.getElementById('remote-video');
      //       remoteVideoElement.srcObject = remoteStream;
      //     });


      //   });

      // }
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }


  };




  const VideoStream = ({ streamSocket }) => {



    //     useEffect(() => {
    // // Create a new Peer object
    // const peer = new Peer();

    // // Handle the 'open' event when the peer connection is established
    // peer.on('open', (peerId) => {
    //   console.log('Connected with peer ID:', peerId);

    //   // Get the user's media stream
    //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //     .then((stream) => {
    //       // Display the local media stream on a video element
    //       const localVideoElement = document.getElementById('localVideo');
    //       localVideoElement.srcObject = stream;
    //       const audioElement = document.createElement('audio');
    //       audioElement.srcObject = stream;
    //       audioElement.play();

    //       // Call a remote peer and send the media stream
    //       const remotePeerId = '123456'; // Replace with the actual remote peer ID
    //       const call = peer.call(remotePeerId, stream);

    //       // Handle the 'stream' event when the remote peer answers the call
    //       call.on('stream', (remoteStream) => {
    //         // Display the remote media stream on a video element
    //         const remoteVideoElement = document.getElementById('remote-video');
    //         remoteVideoElement.srcObject = remoteStream;
    //       });
    //     })
    //     .catch((error) => {
    //       console.error('Error accessing media devices:', error);
    //     });
    // });

    // // Handle incoming calls from remote peers
    // peer.on('call', (call) => {
    //   // Answer the call and send our media stream
    //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    //     .then((stream) => {
    //       call.answer(stream);

    //       // Handle the 'stream' event when the remote peer starts sending their stream
    //       call.on('stream', (remoteStream) => {
    //         // Display the remote media stream on a video element
    //         const remoteVideoElement = document.getElementById('remote-video');
    //         remoteVideoElement.srcObject = remoteStream;
    //       });
    //     })
    //     .catch((error) => {
    //       console.error('Error accessing media devices:', error);
    //     });
    // });

    //     }, [])
    return (
      <div>
        <video className="content-video" id="localVideo" autoPlay ></video>

      </div>
    );
  };



  const Sharing = ({ content, streamSocket }) => {
    let {
      participantImage,
      setParticipantImage
    } = useContext(AppContext);






    return (<div className="sharing">
      {true && (
        <>
          {true && (
            <img className="content-image" src={participantImage} />
          )}
          {false && (
            <VideoStream autoPlay muted loop />
          )}
        </>
      )}
    </div>
    );
  };
  console.log(groupData.groupName);
  return (
    <div>

      {groupId === user.currentGroup && user.currentGroup !== undefined &&
        <div className="room-container">
          <Chat groupId={groupId} socket={socket} user={user} />

          <div className="room0">
            <div className="roomControls-ParticipantsList">
              <RoomControls streamSocket={streamSocket} handleMicToggle={handleMicToggle} />


              <Sharing streamSocket={streamSocket} />

              <ParticipantsList members={groupData.members} />


            </div>
          </div>
        </div>}

      {authStatus.message === "You are already a member of another group. Please leave the current group before joining a new one." && groupId !== user.currentGroup &&
        <div class="error-message">
          <div class="error-icon">
            <FontAwesomeIcon icon={faTimes} size="6x" />
          </div>
          <div class="error-content">
            <h2 class="error-title">You are already in a room</h2>
            <p class="error-description">
              Please close the other room tab and refresh the current tab to join a new group.
            </p>
          </div>
        </div>
      }
      {showLoading &&
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Starting...</div>
        </div>}


    </div>
  );
};

export default Room;
