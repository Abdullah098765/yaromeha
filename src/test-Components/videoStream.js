// import Peer from 'peerjs';
// import React, { useEffect } from 'react';

// const VideoStream = ({ streamSocket }) => {



// //     useEffect(() => {
// // // Create a new Peer object
// // const peer = new Peer();

// // // Handle the 'open' event when the peer connection is established
// // peer.on('open', (peerId) => {
// //   console.log('Connected with peer ID:', peerId);
  
// //   // Get the user's media stream
// //   navigator.mediaDevices.getUserMedia({ video: false, audio: true })
// //     .then((stream) => {
// //       // Display the local media stream on a video element
// //       const localVideoElement = document.getElementById('localVideo');
// //       localVideoElement.srcObject = stream;
// //       const audioElement = document.createElement('audio');
// //       audioElement.srcObject = stream;
// //       audioElement.play();
      
// //       // Call a remote peer and send the media stream
// //       const remotePeerId = '123456'; // Replace with the actual remote peer ID
// //       const call = peer.call(remotePeerId, stream);
      
// //       // Handle the 'stream' event when the remote peer answers the call
// //       call.on('stream', (remoteStream) => {
// //         // Display the remote media stream on a video element
// //         const remoteVideoElement = document.getElementById('remote-video');
// //         remoteVideoElement.srcObject = remoteStream;
// //       });
// //     })
// //     .catch((error) => {
// //       console.error('Error accessing media devices:', error);
// //     });
// // });

// // // Handle incoming calls from remote peers
// // peer.on('call', (call) => {
// //   // Answer the call and send our media stream
// //   navigator.mediaDevices.getUserMedia({ video: true, audio: true })
// //     .then((stream) => {
// //       call.answer(stream);
      
// //       // Handle the 'stream' event when the remote peer starts sending their stream
// //       call.on('stream', (remoteStream) => {
// //         // Display the remote media stream on a video element
// //         const remoteVideoElement = document.getElementById('remote-video');
// //         remoteVideoElement.srcObject = remoteStream;
// //       });
// //     })
// //     .catch((error) => {
// //       console.error('Error accessing media devices:', error);
// //     });
// // });

// //     }, [])
//     return (
//         <div>
//             <video className="content-video" id="localVideo" autoPlay ></video>

//         </div>
//     );
// };

// export default VideoStream;
