import React from "react";
import imagelanding from "../images/fondo.webp";
function Landingpage() {
  return (
    <div>
      <div className="container_img_landing">
        <img className="imglanding" src={imagelanding} alt="landing page"></img>
      </div>
      <form className="formlanding" method="get" action="/home">
        <button className="b-landing" type="submit">
          Home
        </button>
      </form>
    </div>
  );
}

export default Landingpage;
