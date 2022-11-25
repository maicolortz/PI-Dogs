import React from "react";
import imagelanding from "../images/port.png";
function Landingpage() {
  return (
    <div className="landing">
      <form className="formlanding"method="get" action="/home">
        <button className="b-landing" type="submit">
          Home
        </button>
      </form>

      <img className="imglanding" src={imagelanding} alt="landing page"></img>
    </div>
  );
}

export default Landingpage;
