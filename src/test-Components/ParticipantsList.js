// ParticipantsList

import React, { useContext } from "react";

import "./ParticipantsList.css";
import { AppContext } from "../Context/context";

const ParticipantsList = ({members}) => {
  let { participantImage, setParticipantImage } = useContext(AppContext);

  // Assuming you have an array of participants with their names and profile images

  

  return (
    <div className="participant-container">
    
  
      {members &&
          members.map(member =>

            <div className="participant-card">
            <div
              onClick={() =>
                setParticipantImage(
                  member.photoURL
                )}
              className="participant-image"
              style={{
                backgroundImage: `url(${member.photoURL})`
              }}
            >
              <div className="participant-name">
                {member.displayName}
              </div>
            </div>
          </div>

          )}
    </div>
  );
};

export default ParticipantsList;
