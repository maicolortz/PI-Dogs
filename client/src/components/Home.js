import React, { useEffect } from "react";
import { useState } from "react";
import { connect } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import NotFound from "./NotFound.js";
import {
  getDog,
  OrderForName,
  getDogs,
  OrderForWeight,
  filterForTemperament,
  getTemperament,
  getDogDtabase,
} from "../redux/actions/index.js";
import CardDog from "./CardDog.js";
import perrodefault from "../../src/images/perro.png";
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
  getDogDatabase,
}) => {
  ///paginacion

  const [numveces, setNumveces] = useState(0);
  const [inicio, setInicio] = useState(0);
  const [fin, setFin] = useState(8);
  const [contador, setContador] = useState(0);
  const [weight,setWeight]=useState("none");
  
  const [database,setDatabase]=useState("none")
  const [orderaz,setOrderAZ]=useState("none")
  const [temperament,setTemperament]=useState("none")
  let handleback = (e) => {
    e.preventDefault();
    if (contador != 0) {
      setContador(contador - 1);
      setInicio(inicio - 8);
      setFin(fin - 8);
      console.log("back");
    } else {
      console.log("no se puede retroceder");
    }
  };
  let handlenext = (e) => {
    e.preventDefault();
    if (Dog.length) {
      if (contador >= 0 && contador + 1 < Dog.length / 8) {
        setContador(contador + 1);
        setInicio(inicio + 8);
        setFin(fin + 8);
      } else {
        console.log("no se puede avanzar");
      }
    }
  };
  const [name, setName] = useState("");
  // const dispatch=useDispatch()
  const [sort, setSort] = useState();
  /* useEffect(() => {
    getDogs();
  }, [sort]); */
  useEffect(() => {
    getTemperament();
    getDog(" ");
  }, []);

  useEffect(() => {
    setInicio(0);
    setFin(8);
    setContador(0);
  }, [Dog]);
  let handleChange = (e) => {
    e.preventDefault()
    setName(e.target.value);
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    //getDogs();
    getDog(name);
  };
  let order = (e) => {
    e.preventDefault();
    setOrderAZ(e.target.value)
    OrderForName(e.target.value);
    setSort(e.target.value);
  };
  let orderWeight = (e) => {
    e.preventDefault();
    setWeight(e.target.value)
    OrderForWeight(e.target.value);
    setSort(e.target.value);
  };

  let filterTemperament = (e) => {
    e.preventDefault();
    //getTemperament();
    setTemperament(e.target.value)
    filterForTemperament(e.target.value);
    setSort(e.target.value);
  };
  let filterDb = (e) => {
    e.preventDefault();
    setDatabase(e.target.value)
    getDogDatabase(e.target.value);
    setSort(e.target.value);

  };
  let limpiar =e=>{
    e.preventDefault()
    setWeight("none")
    setDatabase("none")
    setOrderAZ("none")
    setTemperament("none")
    getDog("")
    setName("")
  }
  return (
    <div className="contenedormayor">
      <section className="panel">
        <div className="form-group">
          <img
            className="imagenpanel"
            src="https://pupuphooray.com/wp-content/uploads/2019/03/dog-icon.png"
            alt="panel"
          ></img>
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
            <button onClick={(e) => limpiar(e)}>clear Filter</button>
          </div>
          <div>
            <select value={orderaz}onChange={(e) => order(e)}>
              <option value="none" disabled selected defaultValue>
                order Alphabetic
              </option>
              <option value="asc">ascending</option>
              <option value="des">descending</option>
            </select>
          </div>
          <div>
            <select  value={weight} onChange={(e) => orderWeight(e)}>
              <option disabled  value="none" selected defaultValue>
                order Weight
              </option>
              <option value="min" >Minime Weight</option>
              <option value="max">Maxime Weight</option>
            </select>
          </div>
          <div>
            <select value={database}onChange={(e) => filterDb(e)}>
              <option value="none" disabled selected defaultValue>
                Filter Dogs
              </option>
              <option value="true">Dogs in database</option>
              <option value="false">Dogs in extern api</option>
            </select>
          </div>
          <div>
            <select value={temperament}onChange={(e) => filterTemperament(e)}>
              <option value="none" disabled selected defaultValue>
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
          <div>
            <form method="get" action="/newdog">
              <button className="b-create-dog" type="submit">
                Create Dog
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="container">
        {Dog == "not has been founded" ? (
          <NotFound />
        ) : (
          Dog &&
          Dog.slice(inicio, fin).map((dog) => (
            <div key={dog.id}>
              <CardDog
                id={dog.id}
                weight={
                  dog.weight.metric
                    ? dog.weight.metric
                    : dog.weight[0] + " - " + dog.weight[1]
                }
                name={dog.name}
                temperament={
                  dog.temperament
                    ? dog.temperament
                    : dog.temperaments.map((e) => e.name)
                    ? dog.temperaments.map((e) => e.name)
                    : console.log("1")
                }
                img={dog.image ? dog.image : perrodefault}
              />
            </div>
          ))
        )}

        {/* {Dogs && Dogs.map(movie=>(
          <div key={movie.id}>
          <h2>{movie.name}</h2> 
        </div>
      ))} */}
      </section>
      <div className="container">
        <button onClick={(e) => handleback(e)}>BACK</button>
        <button onClick={(e) => handlenext(e)}>NEXT</button>
      </div>
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
    getDogDatabase: (e) => dispatch(getDogDtabase(e)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
