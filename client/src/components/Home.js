import React, { Component } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from 'react-router-dom';
import { getDogs} from "../redux/actions/index.js";



 const Home=({Dogs,getDogs}) =>{
    const [title,setTitle]=useState('')
    let handleChange=(e)=>{
        setTitle(e.target.value);
    }
    let handleSubmit=(e)=>{
        e.preventDefault();
        getDogs();
    }
    return (
      <div>
        <h2>Buscador</h2>
        <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label className="label" htmlFor="title">Película: </label>
            <input
              type="text"
              id="title"
              autoComplete="off"
              value={title}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <button type="submit">BUSCAR</button>
        </form>
        <ul>
      {Dogs && Dogs.map(movie=>(
        <div key={movie.id}>
          <h2>{movie.name}</h2>          
        </div>
      ))}
        </ul>
      </div>
    );
  }
 

function mapStateToProps(state){
  return{
    Dogs:state.allDogs
  }
}
function mapDispatchToProps(dispatch){
  return {
    getDogs: ()=>dispatch(getDogs())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home);
