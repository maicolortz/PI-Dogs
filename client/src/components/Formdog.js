import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
function Formdog() {
  return (
    <div className="contenedor">
      <section className="">
      <form className="formdetail"method="get" action="/home">
        <button className="b-detail" type="submit">
          Back
        </button>
      </form>
      </section>
      <section className="form">
        <div className="headerform">
          <h1>New Dog</h1>
          <br/>
        </div>
        <form>
          <div className="form-g">
            <label>Breed</label>
            <input placeholder="enter your breed"></input>
          </div>
          <div className="form-g">
            <label>Height</label>
            <input placeholder="Height minime"></input>
            <input placeholder=" Height maxime"></input>
          </div>
          <div className="form-g">
            <label>image</label>
            <input type={'image'} placeholder="enter your Height minime"></input>
            
          </div>
          <div className="form-g">
            <label>Weight</label>
            <input placeholder="Weight minime"></input>
            <input placeholder=" Weight maxime"></input>
          </div>
          <div className="form-g">
            <label>life_span</label>
            <input placeholder=" life span in years"></input>
          </div>
          <div className="form-g">
            <label>Temperaments</label>
            <input placeholder=" ...temperaments"></input>
          </div><br/>
          <div >
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Formdog;
