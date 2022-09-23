import React, { Component, useEffect } from "react";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import {
  getDog,
  OrderForName,
  getDogs,
  OrderForWeight,
  filterForTemperament,
  getTemperament,
} from "../redux/actions/index.js";
import CardDog from "./CardDog.js";

const Home = ({
  Dogs,
  OrderForName,
  OrderForWeight,
  Dog,
  getDogs,
  getDog,
  filterForTemperament,
  temperaments,
  getTemperament,
}) => {
  const [name, setName] = useState("");
  // const dispatch=useDispatch()
  const [sort, setSort] = useState();
  useEffect(() => {
    getDog();
  }, [sort]);
  useEffect(() => {
    getTemperament();
    getDog(" ");
  }, []);

  let handleChange = (e) => {
    setName(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    //getDogs();
    getDog(name);
  };
  let order = (e) => {
    e.preventDefault();
    OrderForName(e.target.value);
    setSort(e.target.value);
  };
  let orderWeight = (e) => {
    e.preventDefault();
    OrderForWeight(e.target.value);
    setSort(e.target.value);
  };

  let filterTemperament = (e) => {
    e.preventDefault();
    //getTemperament();
    filterForTemperament(e.target.value);
    setSort(e.target.value);
  };
  return (
    <div className="contenedormayor">
      <section className="panel">
        <div className="form-group">

      <img className="imagenpanel"src="https://pupuphooray.com/wp-content/uploads/2019/03/dog-icon.png"></img>
      <div className="icono"></div>
        </div>
      <form className="form-group" onSubmit={(e) => handleSubmit(e)}>
        <div>
          <label className="label" htmlFor="name">
            BREED:
          </label>
          <input
          placeholder="Search ......"
            type="text"
            id="name"
            autoComplete="off"
            value={name}
            onChange={(e) => handleChange(e)}
          />
        </div>
        <button type="submit">Search</button>
      </form>
      <div className="form-group">

      
      <div>
        <button onClick={() => getDog("")}>clear Filter</button>
      </div>
      <div>
        <select onChange={(e) => order(e)}>
          <option disabled selected defaultValue>
            order Alphabetic
          </option>
          <option value="asc">ascending</option>
          <option value="des">descending</option>
        </select>
      </div>
      <div>
        <select onChange={(e) => orderWeight(e)}>
          <option disabled selected defaultValue>
            order Weight
          </option>
          <option value="min">Minime Weight</option>
          <option value="max">Maxime Weight</option>
        </select>
      </div>
      <div>
        <select onChange={(e) => filterTemperament(e)}>
          <option disabled selected defaultValue>
            Filter by Temperament
          </option>
          <option value="all">All</option>
          {temperaments &&
            temperaments.map((e) => (
              <option value={e.name} key={e.id}>
                {e.name}
              </option>
            ))}
        </select>
      </div>
      <form className="formdetail"method="get" action="/newdog">
        <button className="b-detail" type="submit">
          Create Dog
        </button>
      </form>
      </div>
      </section>
      <section className="container">
        
          {Dog &&
            Dog.map((dog) => (
                <div key={dog.id}>
              <CardDog 
              id={dog.id}
                
                weight={dog.weight.metric}
                 name={dog.name}
                 temperament={dog.temperament}
                 img={dog.image}
                 
                />
              </div>
            ))}
          {/* {Dogs && Dogs.map(movie=>(
          <div key={movie.id}>
          <h2>{movie.name}</h2> 
        </div>
      ))} */}
      </section>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    Dogs: state.allDogs,
    Dog: state.dog,
    temperaments: state.temperaments,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    getDogs: () => dispatch(getDogs()),
    getDog: (name) => dispatch(getDog(name)),
    OrderForName: (e) => dispatch(OrderForName(e)),
    OrderForWeight: (e) => dispatch(OrderForWeight(e)),
    filterForTemperament: (e) => dispatch(filterForTemperament(e)),
    getTemperament: (e) => dispatch(getTemperament(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
