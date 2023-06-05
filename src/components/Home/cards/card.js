import React from "react";
import "./card.css";

export default function Card({ group }) {
  console.log(group);
  return (
    <div className="col item text-light ">
      <div className="card">
        {/* <div className='card-nav'></div> */}
        <div className="row content-row">
          <div className="owner col-2">
            <img
              className="owner-img rounded-circle"
              src={
                "https://lh3.googleusercontent.com/a/ALm5wu3yDqTQweXHjg0dxmgrp5Crvt3cANi5z73yK6ijag=s96-c"
              }
            />

            <p className="text-light ownername">
              {"Sabir Ali"}
            </p>
          </div>
          <div className="groupcontant ">
            <p className="groupName">
              {"Pakistan"}
            </p>
            <p className="groupName"> English </p>
            <p className="groupDiscription fw-lighter">
              {"I am Pakistan"}
            </p>
            <button
              className="btn btn-Join"
              onClick={() =>
                window.open("http://localhost:3000/room:" + group._id)}
            >
              Join Room
            </button>
          </div>
          <div className="row memberlist">
            <div className="col-2 text-light member">
              <img
                className="rounded-circle memberImage col-1"
                src="https://lh3.googleusercontent.com/a/ALm5wu3yDqTQweXHjg0dxmgrp5Crvt3cANi5z73yK6ijag=s96-c"
              />
              <p className="memberName"> Sabir </p>
            </div>
            <div className="col-2 text-light member">
              <img
                className="rounded-circle memberImage col-1"
                src="https://lh3.googleusercontent.com/a/ALm5wu3yDqTQweXHjg0dxmgrp5Crvt3cANi5z73yK6ijag=s96-c"
              />

              <p className="memberName"> Sabir </p>
            </div>
            <div className="col-2 text-light member">
              <img
                className="rounded-circle memberImage col-1"
                src="https://lh3.googleusercontent.com/a/ALm5wu3yDqTQweXHjg0dxmgrp5Crvt3cANi5z73yK6ijag=s96-c"
              />
              <p className="memberName"> Sabir Ali </p>
            </div>
            <div className="col-2 text-light member">
              <img
                className="rounded-circle memberImage col-1"
                src="https://lh3.googleusercontent.com/a/ALm5wu3yDqTQweXHjg0dxmgrp5Crvt3cANi5z73yK6ijag=s96-c"
              />

              <p className="memberName"> Sabir Ali </p>
            </div>
            <div className="col-2 text-light member">
              <img
                className="rounded-circle memberImage col-1"
                src="https://lh3.googleusercontent.com/a/ALm5wu3yDqTQweXHjg0dxmgrp5Crvt3cANi5z73yK6ijag=s96-c"
              />
              <p className="memberName"> Sabir Ali </p>
            </div>
          </div>
        </div>
        {/* < div className = 'footer' > </div> */}
      </div>
    </div>
  );
}
