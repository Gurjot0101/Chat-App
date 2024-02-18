import React from "react";
import "./DefaultScreen.css";

function DefaultScreen() {
  return (
    <div className="defaultScreen">
      <img
        className="defaultScreen__img"
        src="https://img.icons8.com/dusk/344/weixing.png"
        alt="defaultScreenImg"
      />
      <div className="defaultScreen__text">
        <div className="defaultScreen__heading">
          <div className="defaultScreen__heading__title">WhatsChat</div>
          <div className="defaultScreen__heading__text">New</div>
        </div>
        <div className="defaultScreen__body">
          <div>
            Now you can make custom rooms and add invite friends to enjoy a fun
            time together
          </div>
          <div>Tap on add new button to add new groups</div>
        </div>
      </div>
    </div>
  );
}

export default DefaultScreen;
