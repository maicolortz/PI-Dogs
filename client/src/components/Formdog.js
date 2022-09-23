import React from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
function Formdog() {
  return (
    <div className="contenedormayor">
      <section className="panel">
          <NavLink to="/home" end>
            Home
          </NavLink>
      </section>
      <section className="contenedor">
        <div className="headerform">
          <h1>New Dog</h1>
        </div>
        <form>
          <div className="form-group">
            <label>Breed</label>
            <input placeholder="enter your breed"></input>
          </div>
          <div className="form-group">
            <label>Height</label>
            <input placeholder="enter your Height minime"></input>
            <input placeholder="enter your Height maxime"></input>
          </div>
          <div className="form-group">
            <label>Weight</label>
            <input placeholder="enter your Weight minime"></input>
            <input placeholder="enter your Weight maxime"></input>
          </div>
          <div className="form-group">
            <label>life_span</label>
            <input placeholder="enter your life span in years"></input>
          </div>
          <div className="form-group">
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Formdog;
