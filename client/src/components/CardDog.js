import React from "react";
import { NavLink } from "react-router-dom";

function CardDog({ id, img, name, weight, temperament }) {
  return (
    <div className="card">
      <h3>{name}</h3>
      <div className="contain_img_card">

      <img className="imgcard" src={img} alt={name}></img>
      </div>
      <span>
        {" "}
        <strong>Weight (M):   </strong>{weight}
        <strong> Temperaments : </strong>
        {temperament?temperament.slice(0,15):""}...
      </span>
      <NavLink className='navlink'to={`/dogs/${id}`}>Detail</NavLink>
    </div>
  );
}

export default CardDog;
