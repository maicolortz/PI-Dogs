import React from "react";
import { NavLink } from "react-router-dom";

function CardDog({ id, img, name, weight, temperament, height, life_span }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <img className="imgcard" src={img} alt={name}></img>
      <span>
        {" "}
        Weight :{weight}<br/>
        Height :{height}<br/>
        Life Span :{life_span}<br/><br/>
        Temperaments:
        {temperament}<br/>
      </span>
      <NavLink className='navlink'to={`/dog/${id}`}>Detail</NavLink>
    </div>
  );
}

export default CardDog;
