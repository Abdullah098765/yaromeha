import React, { useState, useContext, useEffect } from "react";
import { ethers } from 'ethers';
import { providers } from 'ethers';

import "./GlassyApp.css";
import {
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter
} from "react-icons/fa";
import { AppContext } from "../Context/context";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signOut
} from "firebase/auth";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { useAuthState } from "react-firebase-hooks/auth";

const Modal = ({ sign_In_With_Google, connectWithMetaMask }) => {
  let { showModel, setShowModel } = useContext(AppContext);
  return (
    <div className={` ${!showModel ? "modal-closed" : "modal-overlay"}`}>
      <div className="modal">
        <div className="modal-content">
          <h2>Choose an Option</h2>
          <div className="options">
            <div className="option" onClick={() => sign_In_With_Google()}>
              <i className="fab fa-google" />
              <span>Sign in with Google</span>
            </div>
            <div className="option" onClick={() => {
              connectWithMetaMask()



            }}>
              <img src={'https://raw.githubusercontent.com/MetaMask/metamask-extension/f77b1f65e249a901b8c3339e4fd21d6d043b4e65/app/images/logo/metamask-fox.svg'} alt="MetaMask Logo" className="metamask-icon" />
              <span>Continue with MetaMask</span>
            </div>

          </div>
          <button className="close-button" onClick={() => setShowModel(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};






const GlassyNavbar = ({ signOutFunc, user, sign_In_With_Google }) => {
  let { openDropDown, setOpenDropDown } = useContext(AppContext);
  let { showModel, setShowModel } = useContext(AppContext);

  const toggleDropdown = () => {
    setOpenDropDown(!openDropDown);
    setTimeout(() => {
      setOpenDropDown(false);
    }, 3000);
  };

  return (
    <nav className="glassy-navbar">
      <div className="navbar-brand">
        <h1>Yaromeha App</h1>
      </div>
      {window.localStorage.photoURL ? <div className="navbar-profile">
        <img
          src={window.localStorage.photoURL}
          alt="Profile"
          className="profile-image"
          onClick={toggleDropdown}
        />
        <div className={`dropdown-menu ${openDropDown ? "open" : ""}`}>
          <ul>
            <li>
              <a href="#">
                <FaUser className="dropdown-icon" />
                Profile
              </a>
            </li>
            <li>
              <a href="#">
                <FaCog className="dropdown-icon" />
                Settings
              </a>
            </li>
            <li onClick={() => signOutFunc()}>
              <a href="#">
                <FaSignOutAlt className="dropdown-icon" />
                Logout
              </a>
            </li>
            <hr />
            <li>
              <a href="#">
                <FaUser className="dropdown-icon" />
                Profile
              </a>
            </li>
            <li>
              <a href="#">
                <FaCog className="dropdown-icon" />
                Settings
              </a>
            </li>
            <hr />
            <li onClick={() => signOutFunc()}>
              <a href="#">
                <FaSignOutAlt className="dropdown-icon" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div> : <span className="login" onClick={() => setShowModel(true)} >Sign In</span>}
    </nav>
  );
};

const GlassyCard = ({ group }) => {
  let { showModel, setShowModel } = useContext(AppContext);

  return (
    <div className="card-container">
      <h2 className="card-title">
        {group.groupName}
      </h2>
      <p className="card-description">
        {group.groupDescription}
      </p>
      <hr />

      <div className="member-list">
        {group.members &&
          group.members.map(member =>
            <img
              className="profile-picture"
              src={member.photoURL}
              alt="Profile 1"
            />
          )}
      </div>
      {group._id !== '6489e86efa3ecd991b5f6a65' && <button
        className="card-button"
        onClick={() => {
          if (localStorage.getItem("uid") === null) {
            setShowModel(true);
          } else {
            console.log("Group joined");
            window.open("https://yaromeha-jsw3.vercel.app/room?groupId=" + group._id);
          }
        }}
      >
        Join Group
      </button>}
    </div>
  );
};

const GroupCreationForm = ({ }) => {
  const auth = getAuth();

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [groupData, setGroupData] = useState({
    groupName: "",
    groupDescription: "",
    ownerId: localStorage.getItem("uid"),
    members: []
  });
  let { showModel, setShowModel } = useContext(AppContext);

  const handleOpenForm = () => {
    setIsFormVisible(true);
  };

  const handleSubmit = async e => {
    if (localStorage.getItem("uid") === null) {
      setShowModel(true);
      console.log(localStorage.getItem("uid"));
      e.preventDefault();
    } else {
      e.preventDefault();
      setIsFormVisible(false);
      let a = groupData
      a.ownerId = localStorage.getItem("uid")
      setGroupData(a)
      try {
        const response = await fetch("https://yaromeha-server-production.up.railway.app/create-group", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(groupData)
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data.message, data.group);
          window.open("https://yaromeha-jsw3.vercel.app/room?groupId=" + data.group._id);

        } else {
          const error = await response.json();

          console.log(error.error);
        }
      } catch (error) {

        console.error("Error:", error);
      }
    }
    // Handle form submission logic here
    // You can access form data using state or refs
  };

  return (
    <div className="group-creation">
      {!isFormVisible &&
        <button className="open-form-button" onClick={handleOpenForm}>
          Create a Group
        </button>}

      {isFormVisible &&
        <form
          className="group-form form-appear"
          id="groupForm"
          onSubmit={handleSubmit}
        >
          <label htmlFor="group-name">Group Name:</label>
          <input
            type="text"
            id="group-name"
            onChange={e => {
              groupData.groupName = e.target.value;
            }}
            placeholder="Enter group name"
          />

          <label htmlFor="group-description">Group Description:</label>
          <textarea
            id="group-description"
            onChange={e => {
              groupData.groupDescription = e.target.value;
            }}
            placeholder="Enter group description"
          />

          <button className="create-group-button" type="submit">
            Create Group
          </button>
          <button
            className="cancel-button"
            onClick={() => {
              setIsFormVisible(!isFormVisible);
            }}
          >
            Cancel
          </button>
        </form>}
    </div>
  );
};

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <h2 className="app-name">Yaromeha</h2>
        <p className="app-description">Connecting people through groups</p>
      </div>
      <div className="social-icons">
        <a
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaFacebookF className="social-icon" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaInstagram className="social-icon" />
        </a>
        <a
          href="https://www.twitter.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaTwitter className="social-icon" />
        </a>
      </div>
      <p className="copy-right">© 2023 Yaromeha. All rights reserved.</p>
    </footer>
  );
};

function GlassyApp() {
  const [allGroupsData, setAllGroupsData] = useState([]);
  const [showLoading, setshowLoading] = useState(true);
  let { setUser, user, } = useContext(AppContext);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {

    // Check if user is already connected to MetaMask
    const checkConnection = async () => {
      try {
        // Check if MetaMask is installed
        if (window.ethereum) {
          // Request user's accounts
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          console.log(accounts);

          // Update state based on connection status
          setIsConnected(accounts.length > 0);
        }
      } catch (error) {
        console.error('Error checking MetaMask connection:', error);
      }
    };

    checkConnection();

  }, []);


  useEffect(() => {
    setInterval(() => {
      fetch("https://yaromeha-server-production.up.railway.app/get_groups")
        .then(response => response.text())
        .then(result => {
          setAllGroupsData(JSON.parse(result));
          // console.log(JSON.parse(result));
          setshowLoading(false)
        })
        .catch(error => console.log("error", error));
    }, 200);
  }, []);

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



  const connectWithMetaMask = async () => {


    try {
      // Check if MetaMask is installed
      if (window.ethereum) {
        const account = await window.ethereum.request({ method: 'eth_requestAccounts' });
        console.log(account);

        setIsConnected(true);



      } else {
        // MetaMask is not installed or not available
        console.log('Please install MetaMask extension to connect.');
      }
    } catch (error) {
      // Handle error connecting with MetaMask
      console.error('Error connecting with MetaMask:', error);
    }
  };

  const auth = getAuth();
  let { showModel, setShowModel, setOpenDropDown } = useContext(AppContext);

  function sign_In_With_Google(params) {
    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();

    signInWithPopup(auth, googleProvider).then(user => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      console.log(user);
      var raw = JSON.stringify({
        displayName: user.user.displayName,
        blocked: false,
        email: user.user.email,
        uid: user.user.uid,
        photoURL: user.user.photoURL,
        isOnline: false,
        activeRoomId: "none"
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("https://yaromeha-server-production.up.railway.app/add_user", requestOptions)
        .then(response => response.text())
        .then(result => {
          console.log(JSON.parse(result));
          setShowModel(false);
          localStorage.setItem("uid", JSON.parse(result)._id);
          localStorage.setItem("photoURL", JSON.parse(result).photoURL);
          // window.location = "https://yaromeha-app.web.app";
          console.log("loged in", JSON.parse(result)._id);
        })
        .catch(error => console.log("error", error));
    });
  }
  function signOutFunc() {
    const auth = getAuth();

    signOut(auth)
      .then(e => {
        console.log(e);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ uid: localStorage.getItem("uid") });

        var requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        fetch("https://yaromeha-server-production.up.railway.app/remove_user", requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log("Logged out");
            setOpenDropDown(false);
            localStorage.removeItem("uid");
            localStorage.removeItem("photoURL");
          })
          .catch(error => console.log("error", error));
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (

    <div className="app">

      <GlassyNavbar
        sign_In_With_Google={sign_In_With_Google}
        signOutFunc={signOutFunc}
        user={user}
      />
      <GroupCreationForm sign_In_With_Google={sign_In_With_Google} />
      <Modal sign_In_With_Google={sign_In_With_Google} connectWithMetaMask={connectWithMetaMask} />

      {!showLoading
        ? <div className="container">
          {allGroupsData &&
            allGroupsData.map(group =>
              <GlassyCard
                group={group}
                sign_In_With_Google={sign_In_With_Google}
              />
            )}
        </div>
        : <div className="loading-container">
          <div className="loading-spinner" />
        </div>}

      <Footer />
    </div>
  );
}

export default GlassyApp;
