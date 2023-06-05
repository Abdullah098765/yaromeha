import React, { useEffect, useState } from "react";
import Navbar from "../navbar/navbar";
import Slider from "./slider/slider";
import Card from "./cards/card";
import "./home.css";

export default function Home(params) {
  const [groups, setGroups] = useState();
  useEffect(() => {
    setInterval(() => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({ uid: localStorage.getItem("uid") });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      fetch("http://localhost:5000/get_groups", requestOptions)
        .then(response => response.text())
        .then(result => {
          setGroups(JSON.parse(result));
        })
        .catch(error => console.log("error", error));
    }, 2000);
  });
  return (
    <div>
      <Navbar />
      <Slider />
      <div className="container">
        <div class=" cards">
          <div class="row">
            {groups &&
              groups.map(group =>
                <div>
                  <Card group={group} />
                </div>
              )}
          
          </div>
        </div>
      </div>
    </div>
  );
}
