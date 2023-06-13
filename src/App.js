import { React, useContext, useEffect } from "react";
import SignUp from "./components/SignUp/signUp.js";
import Home from "./components/Home/home.js";
import Room from "./test-Components/room.js";
import { Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { AppContext } from "./Context/context.js";
import {
  useGoogleOneTapLogin,
  GoogleOneTapLogin
} from "react-google-one-tap-login";
import Create_room from "./components/create_room/create_room.js";
import GlassyDesign from "./test-Components/testcomponent.js";
import { io } from "socket.io-client";

function App() {
  const app = initializeApp({
    apiKey: "AIzaSyCmpZ5eJ5XGNIIzBeT6VD5Rhx-mvH_0pZA",
    authDomain: "yaromeha-2.firebaseapp.com",
    projectId: "yaromeha-2",
    storageBucket: "yaromeha-2.appspot.com",
    messagingSenderId: "688732409152",
    appId: "1:688732409152:web:44bddbe139770bf9d8fea5",
    measurementId: "G-X0JJVWETJ8"
  });
  const analytics = getAnalytics(app);
  let { setUser, user, openDropDown, setOpenDropDown } = useContext(AppContext);
  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({ uid: localStorage.getItem("uid") });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch("https://yaromeha-server-production.up.railway.app/get_user", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(JSON.parse(result));
        setUser(JSON.parse(result))
      })
      .catch(error => console.log("error", error));
  }, []);
  // useGoogleOneTapLogin({
  //   onError: error => console.log(error),
  //   onSuccess: response => {
  //     console.log(response);

  //     var myHeaders = new Headers();
  //     myHeaders.append("Content-Type", "application/json");

  //     var raw = JSON.stringify({
  //       displayName: response.name,
  //       blocked: false,
  //       email: response.email,
  //       uid: response.kid,
  //       photoURL: response.picture,
  //       isOnline: false,
  //       activeRoomId: "none"
  //     });

  //     var requestOptions = {
  //       method: "POST",
  //       headers: myHeaders,
  //       body: raw,
  //       redirect: "follow"
  //     };

  //     fetch("https://yaromeha-app.herokuapp.com/add_user", requestOptions)
  //       .then(response => response.text())
  //       .then(result => {
  //         localStorage.setItem("uid", response.email);
  //       })
  //       .catch(error => console.log("error", error));
  //   },
  //   googleAccountConfigs: {
  //     client_id:
  //       "506303301079-lng3pocsm7ovs6nbrhnfjg5e6ken5vi8.apps.googleusercontent.com"
  //   }
  // });

  // useEffect(() => {
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   var raw = JSON.stringify({ uid: localStorage.getItem("uid") });

  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: "follow"
  //   };

  //   fetch("https://yaromeha-app.herokuapp.com/get_user", requestOptions)
  //     .then(response => response.text())
  //     .then(result => {
  //       setUser(JSON.parse(result));
  //     })
  //     .catch(error => console.log("error", error));
  // }, []);

  return (
    <div style={{ margin: 0 + "px", padding: 0 + "px" }}>
      <Routes>
        <Route path="/" element={<GlassyDesign user= {user} />} />

        <Route path="room" element={<Room />} />
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="signup" element={<SignUp />} />
        <Route path="create_room" element={<Create_room />} />
        {/* <Route path="room:id" element={<Room />} /> */}
      </Routes>
    </div>
  );
}
export default App;
