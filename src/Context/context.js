import { useState, createContext } from "react";

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [openDropDown, setOpenDropDown] = useState(false);
  const [adsList, setAdsList] = useState("");
  const [edit_ad, setEdit_ad] = useState({});
  const [city, setCity] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [participantImage, setParticipantImage] = useState("");
  const [showModel, setShowModel] = useState(null);
  const [myPeer, setMyPeer] = useState(null);
  const [audioActive, setAudioActive] = useState(false)
  const [stream, setStream,] = useState(null);


  function getUser(params) {
    return user;
  }
  function getShowModel(params) {
    return { showModel, setShowModel };
  }
  function getEdit_ad(params) {
    return edit_ad;
  }

  function getAdsList(params) {
    return adsList;
  }
  function getCity(params) {
    return city;
  }
  function getCity(params) {
    return city;
  }

  return (
    <AppContext.Provider
      value={{
        user,

        setUser,
        getUser,
        adsList,
        setAdsList,
        getAdsList,
        city,
        setCity,
        getCity,
        openDropDown,
        setOpenDropDown,
        edit_ad,
        setEdit_ad,
        searchValue,
        setSearchValue,
        participantImage,
        setParticipantImage,
        showModel,
        setShowModel,
        getShowModel,
        myPeer, setMyPeer,
        audioActive, setAudioActive,
        stream, setStream,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
