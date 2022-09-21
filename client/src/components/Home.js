import React, { Component, useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { getDog, OrderForName, getDogs} from "../redux/actions/index.js";

const Home = ({ Dogs,OrderForName, Dog, getDogs, getDog }) => {
  const [name, setName] = useState("");
 // const dispatch=useDispatch()
  const [sort,setSort]=useState()
  useEffect(()=>{
    getDog();
  },[sort])
  let handleChange = (e) => {
    setName(e.target.value);
  };
  let handleSubmit = (e) => {
    e.preventDefault();
    //getDogs();
    getDog(name);
  };
  let order=(e)=>{
    e.preventDefault();
    OrderForName(e.target.value);
    setSort(e.target.value);
  }
  return (
    <div>
      <h2>Buscador</h2>
      <form className="form-container" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="label" htmlFor="name">
            raza:{" "}
          </label>
          <input
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">BUSCAR</button>
      </form>
      <div>
        <button onClick={() => getDog("")}>clear Filter</button>
      </div>
      <div>
        <label> order Alphabetic</label>
      <select onChange={(e)=>order(e)}>
            <option value="asc">ascending</option>
            <option  value="des">descending</option>
          </select>
      </div>

      <ul>
        {Dog &&
          Dog.map((movie) => (
            <div key={movie.id}>
              <h2>{movie.name}</h2>
            </div>
          ))}
        {/* {Dogs && Dogs.map(movie=>(
        <div key={movie.id}>
          <h2>{movie.name}</h2> 
        </div>
      ))} */}
      </ul>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Dogs: state.allDogs,
    Dog: state.dog,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getDogs: () => dispatch(getDogs()),
    getDog: (name) => dispatch(getDog(name)),
    OrderForName:(e)=>dispatch(OrderForName(e))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
