import React from "react";
import { NavLink } from "react-router-dom";

function CardDog({ id, img, name, weight, temperament }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <img className="imgcard" src={img} alt={name}></img>
      <span>
        {" "}
        <br/>
        <strong>Weight Metric :   </strong>{weight}<br/>
        <br/>
        <strong>Temperaments:</strong><br/>
        {temperament}<br/>
      </span><br/>
      <NavLink className='navlink'to={`/dogs/${id}`}>Detail</NavLink>
    </div>
  );
}

export default CardDog;
